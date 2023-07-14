import Head from "next/head";
import Script from "next/script";
import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import cn from "classnames";
import formatDate from "date-fns/format";
import useSWR, { mutate, SWRConfig } from "swr";
import "tailwindcss/tailwind.css";
import { listGuestbookEntries } from "@/lib/fauna";
import SuccessMessage from "@/components/SuccessMessage";
import ErrorMessage from "@/components/ErrorMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Analytics } from "@vercel/analytics/react";
import { animateScroll as scroll } from "react-scroll";

const fetcher = (url) => fetch(url).then((res) => res.json());

const putEntry = (payload) =>
  fetch("/api/entries", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => (res.ok ? res.json() : Promise.reject(res)));

const useEntriesFlow = ({ fallback }) => {
  const { data: entries } = useSWR("/api/entries", fetcher, {
    fallbackData: fallback.entries,
  });
  const onSubmit = async (payload) => {
    await putEntry(payload);
    await mutate("/api/entries");
  };

  return {
    entries,
    onSubmit,
  };
};

const AppHead = () => (
  <Head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta
      name="description"
      content="Sign the guestbook and leave a message for a future visitor."
    />
    <link rel="shortcut icon" href="/static/favicon.ico" />
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/static/apple-touch-icon.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/static/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/static/favicon-16x16.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/static/android-chrome-192x192.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/static/android-chrome-512x512.png"
    />

    <style>
      {`
      body {
        background-color: #f5f5f5;
        font-family: Arial, sans-serif;
      }
      `}
    </style>
    <title>Quirko - Guestbook</title>
  </Head>
);

const EntryItem = ({ entry }) => (
  <motion.div
    className="flex flex-col space-y-2"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <div className="prose dark:prose-dark w-full bg-white p-4 rounded-md shadow-md">
      {entry.message}
    </div>
    <div className="flex items-center space-x-3">
      <p className="text-sm text-gray-500">{entry.name}</p>
      <p className="text-sm text-gray-400 dark:text-gray-600">
        {formatDate(new Date(entry.createdAt), "d MMM yyyy 'at' h:mm bb")}
      </p>
    </div>
  </motion.div>
);

const EntryForm = ({ onSubmit: onSubmitProp }) => {
  const initial = {
    message: "",
  };
  const [values, setValues] = useState(initial);
  const [formState, setFormState] = useState("initial");
  const isSubmitting = formState === "submitting";

  const onSubmit = (ev) => {
    ev.preventDefault();

    setFormState("submitting");
    onSubmitProp(values)
      .then(() => {
        setValues(initial);
        setFormState("submitted");
      })
      .catch(() => {
        setFormState("failed");
      });
  };

  const makeOnChange =
    (fieldName) =>
    ({ target: { value } }) =>
      setValues({
        ...values,
        [fieldName]: value,
      });

  const inputClasses = cn(
    "block py-2 bg-white dark:bg-gray-800",
    "rounded-md border-gray-300 focus:ring-blue-500",
    "focus:border-blue-500 text-gray-900 dark:text-gray-100"
  );

  return (
    <>
      <script
        defer
        data-domain="guestbook.quirko.me"
        src="https://plausible.aydenjahola.com/js/script.js"
      ></script>
      <motion.form
        className="flex relative my-4"
        onSubmit={onSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <input
          required
          className={cn(inputClasses, "pl-4 pr-32 flex-grow border")}
          aria-label="Your message"
          placeholder="Your message..."
          value={values.message}
          onChange={makeOnChange("message")}
        />
        <motion.button
          className={cn(
            "flex items-center justify-center",
            "absolute right-1 top-1 px-4 font-bold h-8",
            "bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded w-28"
          )}
          type="submit"
          disabled={isSubmitting}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {isSubmitting ? <LoadingSpinner /> : "Sign"}
        </motion.button>
      </motion.form>
      {{
        failed: () => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ErrorMessage>Something went wrong. :(</ErrorMessage>
          </motion.div>
        ),

        submitted: () => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SuccessMessage>Thanks for signing the guestbook.</SuccessMessage>
          </motion.div>
        ),
      }[formState]?.()}
      <Analytics />
    </>
  );
};

const BackToTopButton = () => {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(scrollY.current > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY]);

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 500,
      smooth: true,
    });
  };

  return (
    <motion.button
      className={cn(
        "fixed right-4 bottom-4 p-3 rounded-full",
        "bg-gray-800 text-white",
        "flex items-center justify-center shadow-lg",
        { hidden: !isVisible }
      )}
      onClick={scrollToTop}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.1 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </motion.button>
  );
};

const Guestbook = ({ fallback }) => {
  const { entries, onSubmit } = useEntriesFlow({ fallback });

  return (
    <SWRConfig value={{ fallback }}>
      <main className="max-w-4xl mx-auto p-4">
        <AppHead />
        <div
          className={cn(
            "border border-blue-200 rounded p-6",
            "my-4 w-full dark:border-gray-800",
            "shadow-lg"
          )}
        >
          <motion.h5
            className={cn(
              "text-3xl md:text-4xl font-bold",
              "mb-4 border-b-2 pb-2",
              "text-center"
            )}
            style={{
              background: "linear-gradient(180deg, #f84df8, #a928ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Sign the Guestbook
          </motion.h5>
          <motion.p
            className="my-1 text-gray-800 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Share a message for a future visitor.
          </motion.p>
          <EntryForm onSubmit={onSubmit} />
        </div>
        <motion.div
          className="mt-4 space-y-8 px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {entries?.map((entry) => (
            <EntryItem key={entry._id} entry={entry} />
          ))}
        </motion.div>
        <BackToTopButton />
      </main>
    </SWRConfig>
  );
};

export async function getStaticProps() {
  const entries = await listGuestbookEntries();
  return {
    props: {
      fallback: {
        entries,
      },
    },
  };
}

export default Guestbook;

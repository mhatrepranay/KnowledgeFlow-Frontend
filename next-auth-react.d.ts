declare module "next-auth/react";
// next-auth.d.ts
declare module "next-auth";
declare module "next-auth/providers/google";
declare module "next-auth/providers/github";
declare module "react-hot-toast";
declare module "@stripe/react-stripe-js";
declare module "formik";
declare module "react-big-calendar";
declare module "react-modal";
declare module "react-router-dom";
declare module "suggestions";

declare global {
  interface Window {
    webkitSpeechRecognition: any; // Declare webkitSpeechRecognition property
  }
}

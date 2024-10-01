import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import Header from "../Header";
import Footer from "../Footer";
import CourseDetails from "./CourseDetails";
import {
  useCreatePayementIntentMutation,
  useGetStripePublishableKeyQuery,
} from "@/redux/features/orders/ordersApi";

import { loadStripe } from "@stripe/stripe-js";

type Props = {
  id: string;
};

const CourseDeatilsPage = ({ id }: Props) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [clientSecret, setClientSecret] = useState<string>("");

  const [stripePromise, setStripePromise] = useState<any>(null);
  const { data, isLoading } = useGetCourseDetailsQuery(id);
  const { data: config } = useGetStripePublishableKeyQuery({});
  const [createPayementIntent, { data: paymentIntentData, error }] =
    useCreatePayementIntentMutation();

  useEffect(() => {
    if (config) {
      const publishablekey = config?.publishableKey;
      setStripePromise(loadStripe(publishablekey));
    }
  }, [config]);

  useEffect(() => {
    if (data) {
      const amount = Math.round(data.course.price * 100);
      createPayementIntent(amount);
    }
  }, [data]);

  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData.client_secret);
    }
  }, [paymentIntentData]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching payment intent data:", error);
    }
  }, [error]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={data?.course?.name + "~ Elearning"}
            description="my new project lms"
            keywords={data?.course?.tags}
          />
          <Header
            open={open}
            setOpen={setOpen}
            activeItem={1}
            setRoute={setRoute}
            route={route}
          />

          <CourseDetails
            data={data.course}
            stripePromise={stripePromise}
            clientSecret={clientSecret}
            setOpen={setOpen}
            setRoute={setRoute}
          />

          <Footer />
        </div>
      )}
    </>
  );
};

export default CourseDeatilsPage;

import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";

import { useRef } from "react";
import { BsWifiOff } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { networkMode } from "../app/features/networkSlice";

const InternetConnectionProvider = ({ children }) => {
  const toast = useToast();
  const toastIdRef = useRef();
  const dispatch = useDispatch();

  function close() {
    toast.closeAll(toastIdRef.current);
  }
  function addToast() {
    toastIdRef.current = toast({
      title: "No internet connection",
      description: "Please check your internet connection",
      status: "warning",
      duration: null,
      isClosable: true,
      position: "top",
      icon: <BsWifiOff size={20} />,
    });
  }
  const setOnline = () => {
    dispatch(networkMode(true));
    close();
  };
  const setOffline = () => {
    dispatch(networkMode(false));
    addToast();
  };
  useEffect(() => {
    window.addEventListener("offline", setOffline);
    window.addEventListener("online", setOnline);
    return () => {
      window.removeEventListener("offline", setOffline);
      window.removeEventListener("online", setOnline);
    };
  }, []);

  return children;
};

export default InternetConnectionProvider;

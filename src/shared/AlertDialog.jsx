import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import React from "react";
import { Button } from "@chakra-ui/react";

export default function CustomAlertDialog({
  isOpen,
  onClose,
  onOkHandler,
  title,
  description,
  okTxt = "ok",
  cancelText = "Cancel",
  isLoading,
}) {
  const cancelRef = React.useRef();

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay
          bg="blackAlpha.500"
          backdropFilter="blur(5px)"
          hue-rotate="(90deg)"
        />

        <AlertDialogContent>
          <AlertDialogHeader>{title}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{description}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {cancelText}
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              variant={"outline"}
              onClick={onOkHandler}
              isLoading={isLoading}
            >
              {okTxt}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

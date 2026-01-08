"use client";

import { Dialog, Button, Flex, Text } from "@chakra-ui/react";

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: "success" | "error" | "info";
  buttonText?: string;
}

export default function MessageModal({
  isOpen,
  onClose,
  title,
  message,
  type = "info",
  buttonText = "OK",
}: MessageModalProps) {
  const colorMap = {
    success: "green",
    error: "red",
    info: "blue",
  };

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(e) => !e.open && onClose()}
    >
      <Dialog.Backdrop bg="blackAlpha.600" />

      <Dialog.Positioner>
        <Dialog.Content>
          {/* HEADER */}
          <Dialog.Header>
            <Dialog.Title color={`${colorMap[type]}.500`}>
              {title}
            </Dialog.Title>
          </Dialog.Header>

          {/* BODY */}
          <Dialog.Body>
            <Text>{message}</Text>
          </Dialog.Body>

          {/* FOOTER */}
          <Dialog.Footer>
            <Flex justify="flex-end">
              <Button
                colorScheme={colorMap[type]}
                onClick={onClose}
              >
                {buttonText}
              </Button>
            </Flex>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}

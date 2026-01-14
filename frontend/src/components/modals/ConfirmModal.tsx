"use client";

import { Dialog, Button, Flex, Text, Box } from "@chakra-ui/react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;

  /** optional: only use for destructive actions */
  confirmColorScheme?: "red";
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm",
  message,
  confirmText = "Yes",
  cancelText = "Cancel",
  confirmColorScheme,
}: ConfirmModalProps) {
  const displayMessage = message || title;

  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
      <Dialog.Backdrop bg="blackAlpha.600" />

      <Dialog.Positioner>
        <Dialog.Content borderRadius="lg" px={6} py={4}>
          {/* HEADER */}
          <Dialog.Header pb={2}>
            <Dialog.Title>
              <Text fontSize="lg" fontWeight="semibold" color="black">
                {title}
              </Text>
            </Dialog.Title>
          </Dialog.Header>

          {/* BODY */}
          <Dialog.Body>
            <Box py={2}>
              <Text fontSize="md" color="black">
                {displayMessage}
              </Text>
            </Box>
          </Dialog.Body>

          {/* FOOTER */}
          <Dialog.Footer>
            <Flex gap={3} justify="flex-end">
              <Button variant="outline" onClick={onClose}>
                {cancelText}
              </Button>

              <Button
                bg={confirmColorScheme ? undefined : "black"}
                color={confirmColorScheme ? undefined : "white"}
                _hover={
                  confirmColorScheme
                    ? undefined
                    : { bg: "gray.800" }
                }
                colorScheme={confirmColorScheme}
                onClick={onConfirm}
              >
                {confirmText}
              </Button>
            </Flex>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}

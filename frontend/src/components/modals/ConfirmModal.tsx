"use client";

import { Dialog, Button, Flex, Text } from "@chakra-ui/react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;           // 🔥 REQUIRED (no hard-code)
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm",
  message,
  confirmText = "Yes",
  cancelText = "Cancel",
}: ConfirmModalProps) {
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
            <Dialog.Title>{title}</Dialog.Title>
          </Dialog.Header>

          {/* BODY */}
          <Dialog.Body>
            <Text>{message}</Text>
          </Dialog.Body>

          {/* FOOTER */}
          <Dialog.Footer>
            <Flex gap={3} justify="flex-end">
              <Button variant="outline" onClick={onClose}>
                {cancelText}
              </Button>

              <Button colorScheme="red" onClick={onConfirm}>
                {confirmText}
              </Button>
            </Flex>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}

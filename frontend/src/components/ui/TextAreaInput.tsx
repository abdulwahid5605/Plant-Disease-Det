"use client";

import { Box, Textarea, Text } from "@chakra-ui/react";

interface TextAreaInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextAreaInput({
  label,
  placeholder,
  value,
  onChange,
}: TextAreaInputProps) {
  return (
    <Box width="100%">
      <Text mb={1} fontSize="sm">
        {label}
      </Text>

      <Textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        borderColor="gray.300"
        resize="none"
        _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal" }}
      />
    </Box>
  );
}

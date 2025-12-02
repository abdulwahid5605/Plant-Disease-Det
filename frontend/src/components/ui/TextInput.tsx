"use client";

import { Box, Input, Text } from "@chakra-ui/react";

interface TextInputProps {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: TextInputProps) {
  return (
    <Box width="100%">
      <Text mb={1} fontSize="sm">
        {label}
      </Text>

      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        borderColor="gray.300"
        _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal" }}
      />
    </Box>
  );
}

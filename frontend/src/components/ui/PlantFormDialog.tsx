"use client";

import {
    Dialog,
    Button,
    Flex,
    Box,
    Input,
    Textarea,
    VStack,
    Text,
    Center,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Plant {
  _id?: string;
  title: string;
  price: number;
  quantity?: number;
  description?: string;
  number?: string;
  email?: string;
  address?: string;
  plantAge?: string;
  image?: File | null; // 🔥 IMPORTANT
}


interface PlantFormDialogProps {
    isOpen: boolean;
    onClose: () => void;
    mode: "create" | "edit" | "view";
    plant?: Plant | null;
    onSubmit?: (data: Plant) => void;
}
const formatPrice = (value: number | undefined) => {
    if (!value) return "";
    return value.toLocaleString("en-PK");
};

export default function PlantFormDialog({
    isOpen,
    onClose,
    mode,
    plant,
    onSubmit,
}: PlantFormDialogProps) {
    const isView = mode === "view";
    const isEdit = mode === "edit";

const [form, setForm] = useState<Plant>({
  title: "",
  price: 0,
  quantity: 1,
  description: "",
  number: "",
  email: "",
  address: "",
  plantAge: "",
  image: null,
});


    // 🔁 Pre-fill form for edit/view
 useEffect(() => {
  if (plant) {
    setForm({
      title: plant.title,
      price: plant.price,
      quantity: plant.quantity || 1,
      description: plant.description || "",
      number: plant.number || "",
      email: plant.email || "",
      address: plant.address || "",
      plantAge: plant.plantAge || "",
      image: null, // 🔥 file input reset
    });
  } else {
    setForm({
      title: "",
      price: 0,
      quantity: 1,
      description: "",
      number: "",
      email: "",
      address: "",
      plantAge: "",
      image: null,
    });
  }
}, [plant, isOpen]);


    const handleSubmit = () => {
        if (!onSubmit) return;
        onSubmit(form);
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
            <Dialog.Backdrop  bg="blackAlpha.600" />

            <Dialog.Positioner>
                <Dialog.Content>
                    {/* HEADER */}
                    <Dialog.Header>
                        <Dialog.Title>
                            {mode === "create" && "Add Plant"}
                            {mode === "edit" && "Edit Plant"}
                            {mode === "view" && "Plant Details"}
                        </Dialog.Title>
                    </Dialog.Header>

                    {/* BODY */}
                    <Dialog.Body>
                        <VStack gap={1} align="stretch">
                            {/* Plant Name */}
                            <Box>
                                <Text fontSize="sm" mb={1}>Plant Name</Text>
                                <Input
                                    value={form.title}
                                    readOnly={isView}
                                    onChange={(e) =>
                                        setForm({ ...form, title: e.target.value })
                                    }
                                />
                            </Box>

                            {/* Price */}
                            {/* Price */}
                            <Box>
                                <Text fontSize="sm" mb={1}>
                                    Price (PKR)
                                </Text>

                                <Input
                                    inputMode="numeric"
                                    placeholder="e.g. 20,000"
                                    value={formatPrice(form.price)}
                                    readOnly={isView}
                                    onChange={(e) => {
                                        const raw = e.target.value.replace(/,/g, "");

                                        if (!/^\d*$/.test(raw)) return;

                                        setForm({
                                            ...form,
                                            price: raw === "" ? 0 : Number(raw),
                                        });
                                    }}
                                />
                            </Box>


                            {/* Quantity */}
                            <Box>
                                <Text fontSize="sm" mb={1}>
                                    Quantity
                                </Text>

                                <Input
                                    type="number"
                                    min={1}
                                    value={form.quantity || 1}
                                    readOnly={isView}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            quantity: Number(e.target.value),
                                        })
                                    }
                                />
                            </Box>


                            {/* Phone */}
                            <Box>
                                <Text fontSize="sm" mb={1}>Phone Number</Text>
                                <Input
                                    value={form.number || ""}
                                    readOnly={isView}
                                    onChange={(e) =>
                                        setForm({ ...form, number: e.target.value })
                                    }
                                />
                            </Box>

                            {/* Email */}
                            <Box>
                                <Text fontSize="sm" mb={1}>Email Address</Text>
                                <Input
                                    type="email"
                                    value={form.email || ""}
                                    readOnly={isView}
                                    onChange={(e) =>
                                        setForm({ ...form, email: e.target.value })
                                    }
                                />
                            </Box>

                            {/* Address */}
                            <Box>
                                <Text fontSize="sm" mb={1}>Location / Address</Text>
                                <Input
                                    value={form.address || ""}
                                    readOnly={isView}
                                    onChange={(e) =>
                                        setForm({ ...form, address: e.target.value })
                                    }
                                />
                            </Box>

                            {/* Plant Age */}
                            <Box>
                                <Text fontSize="sm" mb={1}>Plant Age</Text>
                                <Input
                                    placeholder="e.g. 6 months"
                                    value={form.plantAge || ""}
                                    readOnly={isView}
                                    onChange={(e) =>
                                        setForm({ ...form, plantAge: e.target.value })
                                    }
                                />
                            </Box>

                            {/* Description */}
                            <Box>
                                <Text fontSize="sm" mb={1}>Description</Text>
                                <Textarea
                                    value={form.description}
                                    readOnly={isView}
                                    onChange={(e) =>
                                        setForm({ ...form, description: e.target.value })
                                    }
                                />
                            </Box>

                            {/* Image Upload (create/edit only) */}
                            {!isView && (
                                <Box>
                                    <Text fontSize="sm" mb={1}>Plant Image</Text>
<Input
  type="file"
  accept="image/*"
  disabled={isView}
 onChange={(e) =>
  setForm({ ...form, image: e.target.files[0] }) // ✅ FILE
}

/>
                                </Box>
                            )}
                        </VStack>
                    </Dialog.Body>


                    {/* FOOTER */}
                    <Dialog.Footer>
                        <Flex justify="flex-end" gap={3}>
                            <Button variant="outline" onClick={onClose}>
                                {isView ? "Close" : "Cancel"}
                            </Button>

                            {!isView && (
                                <Button
                                    colorScheme="green"
                                    onClick={handleSubmit}
                                >
                                    {isEdit ? "Update" : "Add Post"}
                                </Button>
                            )}
                        </Flex>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    );
}

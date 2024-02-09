"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IAnimal } from "@/lib/database/models/animal.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { animalFormSchema } from "@/lib/validator";
import { z } from "zod";
import { animalDefaultValues } from "@/constants/index";
import Dropdown from "./Dropdown";
import FileUploader from "./FileUploader";
import { useUploadThing } from "@/lib/uploadthing";
import { createAnimal, updateAnimal } from "@/lib/actions/animal.actions";

type AnimalFormProps = {
  type: "Create" | "Update";
  animal?: IAnimal;
  animalId?: string;
};

const AnimalForm = ({ type, animal, animalId }: AnimalFormProps) => {
  const initialValues = animalDefaultValues;
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const form = useForm<z.infer<typeof animalFormSchema>>({
    resolver: zodResolver(animalFormSchema),
    defaultValues: initialValues,
  });
  const { startUpload } = useUploadThing("imageUploader");

  async function onSubmit(values: z.infer<typeof animalFormSchema>) {
    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === "Create") {
      try {
        const newAnimal = await createAnimal({
          animal: { ...values, imageUrl: uploadedImageUrl },
        });

        if (newAnimal) {
          form.reset();
          router.push(`/animals/${newAnimal._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "Update") {
      if (!animalId) {
        router.back();
        return;
      }

      try {
        const updatedAnimal = await updateAnimal({
          animal: { ...values, imageUrl: uploadedImageUrl, _id: animalId },
          path: `/animals/${animalId}`,
        });

        if (updatedAnimal) {
          form.reset();
          router.push(`/animals/${updatedAnimal._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    className="input-field"
                    placeholder="Enter the animal's name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="speciesId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Species</FormLabel>
                <FormControl>
                  <Dropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Description</FormLabel>
                <FormControl className="h-72">
                  <Textarea
                    className="textarea rounded-2xl"
                    placeholder="Describe the animal"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>maxSize: 4,194304 Megabytes</FormDescription>
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
        >
          {form.formState.isSubmitting ? "Submitting..." : `${type} Animal `}
        </Button>
      </form>
    </Form>
  );
};

export default AnimalForm;

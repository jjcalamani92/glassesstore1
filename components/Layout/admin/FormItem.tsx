import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, FC, useState } from 'react';
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Category, Featured, Item, Section, Site } from "../../../src/interfaces";

interface FormData {
  _id?: string;
  name: string;
  href: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}
interface Props {
  item: Item
  category: string
  section: string
}


export const FormItem: FC<Props> = ({ item, category, section }) => {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors }, getValues, setValue, watch } = useForm<FormData>({
    defaultValues: item,
  })
  const onSubmit = async (form: FormData) => {
    let { _id, href, ...data } = form
    const dat = { ...data, category: category, section: section }
    const da = { ...dat, item: form._id }

    if (router.query.item === 'new') {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Item Creado',
        showConfirmButton: false,
        timer: 1500
      })
      await axios.put(`${process.env.APIS_URL}/api/site/additem/${process.env.API_SITE}`, dat)
      router.replace(`/admin/sites/${router.query.category}/${router.query.section}`)
    } else {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Item Actualizado',
        showConfirmButton: false,
        timer: 1500
      })
      await axios.put(`${process.env.APIS_URL}/api/site/updateitem/${process.env.API_SITE}`, da)
      router.replace(`/admin/sites/${router.query.category}/${router.query.section}`)
    }
  }
  const onFileSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) {
      return;
    }
    try {
      for (const file of target.files) {
        const formData = new FormData();
        formData.append('file', file);
        const { data } = await axios.post(`${process.env.APIUP_URL}/api/upload/image`, formData)
        setValue('imageSrc', (getValues('imageSrc'), data.url), { shouldValidate: true })
      }
    } catch (error) {
      console.log({ error })
    }
  }


  return (
    <>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto py-2 sm:py-2 lg:py-2 lg:max-w-none">

          <div className="my-6 container px-2 mx-auto flex flex-row lg:flex-row items-center lg:items-center justify-between ">
              <h4 className="text-2xl font-bold leading-tight text-gray-800">{
                item._id ? `Actualizar Item` : `Crear Item`
              }</h4>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">

                  <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-6">
                    <div className="col-span-2">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Nombre del Item
                        </label>
                        <input
                          className="my-2 focus:ring-rose-500 focus:border-rose-500 block w-full shadow-sm sm:text-sm  rounded-md p-1 border border-gray-300"
                          type={"text"}
                          {...register('name', {
                            onChange: (e) => { },
                            onBlur: (e) => { },
                            required: 'Este campo es requerido',
                            minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                          })}
                        />
                        <div>
                          {errors.name && <span className="text-sm text-rose-500">{errors.name.message}</span>}
                        </div>
                      </div>
                      <div>
                        <label htmlFor="imageAlt" className="block text-sm font-medium text-gray-700">
                          Descripción de la Imagen
                        </label>
                        <div className="mt-1">
                          <textarea
                            rows={2}
                            className="shadow-sm focus:ring-rose-500 focus:border-rose-500 my-2 block w-full sm:text-sm border border-gray-300 rounded-md p-1"
                            {...register('imageAlt', {
                              required: 'Este campo es requerido',
                              minLength: { value: 2, message: 'Mínimo 3 caracteres' }
                            })}
                          />
                        </div>
                        <div>
                          {errors.imageAlt && <span className="text-sm text-rose-500">{errors.imageAlt.message}</span>}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                          Descripción del Item
                        </label>
                        <div className="mt-1">
                          <textarea
                            rows={2}
                            className="shadow-sm focus:ring-rose-500 focus:border-rose-500 my-2 block w-full sm:text-sm border border-gray-300 rounded-md p-1"
                            {...register('description', {
                              required: 'Este campo es requerido',
                              minLength: { value: 2, message: 'Mínimo 3 caracteres' }
                            })}
                          />
                        </div>
                        <div>
                          {errors.description && <span className="text-sm text-rose-500">{errors.description.message}</span>}
                        </div>
                      </div>

                    </div>

                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Imagen del Item</label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex justify-center px-6 pt-5 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex flex-col text-sm text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-rose-500 hover:text-rose-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-rose-500"
                              >
                                <span>Cargar un archivo</span>
                                <input id="file-upload" name="file-upload" accept="image/png, image/gif, image/jpeg, image/webp" type="file" className="sr-only" onChange={onFileSelected} />
                              </label>
                              <p className="pl-1">o arrastrar y soltar</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 5MB</p>
                          </div>
                        </div>
                        <div className="" >
                          <div className="relative border-2 rounded-md">
                            <Image
                              src={getValues('imageSrc')}
                              alt="image"
                              height={300}
                              width={300}
                              objectFit="contain"
                            // className="object-center object-cover"
                            />
                            {/* <FontAwesomeIcon
                              className="text-sm leading-none mx-1 text-gray-600 hover:text-gray-900 rounded focus:outline-none absolute bottom-1 right-1"
                              // onClick={() => onDeleteImage(data)}
                              icon={faCircleMinus}
                            /> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" bg-white text-right ">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                    >
                      {
                        item._id ? `Actualizar Item` : `Crear Item`
                      }
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
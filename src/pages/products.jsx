import DeleteIcon from "@mui/icons-material/Delete";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useContext, useState } from "react";
import { FiEdit } from "react-icons/fi";
import axios from "axios";
import { NavContext } from "../context/navContext";
import { Modal } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";

const Products = () => {
  const { open, setOpen } = useContext(NavContext);
  const [image, setImage] = useState(null);
  const [err, setErr] = useState(false);

  const handleCloseModal = () => {
    setOpen(false);
    setImage(null);
    formik.setValues({
      name: "",
      category: "",
      price: "",
      profit: "",
      photo: "",
    });
  };

  const handleFormChange = (e) => {
    if (e.target.name == "photo") {
      const img = URL.createObjectURL(e.target.files[0]);
      setImage(img);
      // setNewMenu({
      //   ...newMenu,
      //   [e.target.name]:
      //     newMenu.name != "" ? newMenu.name + ".png" : e.target.files[0].name,
      // });
      formik.setFieldValue(
        e.target.name,
        formik.initialValues.name != ""
          ? formik.initialValues.name + ".png"
          : e.target.files[0].name
      );
    } else {
      formik.setFieldValue(e.target.name, e.target.value);
      //setNewMenu({ ...newMenu, [e.target.name]: e.target.value });
    }
  };

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      try {
        const result = await axios.get(
          "https://joglo-ndeso-kasir-api.vercel.app/admin/v1/getAllProducts",
          { withCredentials: true }
        );
        return result.data;
      } catch (error) {
        return error;
      }
    },
    queryKey: ["form"],
  });

  const productMutation = useMutation({
    mutationFn: async () => {
      try {
        const result = await axios.post(
          "https://joglo-ndeso-kasir-api.vercel.app/admin/v1/addNewMenu",
          formik.values
        );
        console.log(formik.values);
        setOpen(false);
        setImage(null);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Berhasil Menambah Menu baru!",
          showConfirmButton: false,
          timer: 2000,
        });
        console.log(result);
        return result;
      } catch (error) {
        setOpen(false);
        setImage(null);
        Swal.fire({
          position: "center",
          icon: "error",
          title: error.response.data.errMessage,
          showConfirmButton: false,
          timer: 2000,
        });
        console.log(error);
        return error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["form"] });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (prodId) => {
      try {
        const response = await axios.post(
          "https://joglo-ndeso-kasir-api.vercel.app/admin/v1/deleteProduct",
          { name: prodId }
        );
        console.log(response);
        return response;
      } catch (error) {
        return console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["form"] });
    },
  });

  const handleSubmit = async () => {
    if (formik.errors.photo == "requiredPhoto") {
      setErr(err);
      console.log("first");
    } else {
      // formik.values({
      //   name: "",
      //   category: "",
      //   price: "",
      //   profit: "",
      //   photo: "",
      // });
      productMutation.mutate();
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      price: "",
      profit: "",
      photo: "",
    },
    validationSchema: Yup.object().shape({
      photo: Yup.string().required("requiredPhoto"),
    }),
    onSubmit: handleSubmit,
  });

  const deleteProduct = (e) => {
    const productId =
      e.target.parentElement.parentElement.parentElement.parentElement.id;
    Swal.fire({
      title: "Yakin hapus menu ini?",
      text: "Periksa lagi apakah sudah benar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus menu ini!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          deleteProductMutation.mutate(productId);
          Swal.fire({
            title: "Menu berhasil dihapus!",
            text: productId + " telah berhasil  dihapus",
            icon: "success",
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <div className="w-full h-screen p-3">
      <div className="mt-16 w-full h-[510px] overflow-scroll relative">
        {isLoading ? (
          <div className="m-auto font-bold text-5xl">loading</div>
        ) : (
          <table className="bg-white rounded-md w-full text-sm xl:text-base">
            <thead className="border-b-2 sticky top-0 z-20 bg-blue-500 text-white">
              <tr>
                <th className="text-start px-4 py-2 xl:py-4">Images</th>
                <th className="text-start px-4 py-2 xl:py-4">Name</th>
                <th className="text-start px-4 py-2 xl:py-4 flex flex-col xl:flex-row gap-x-2">
                  <span>Category</span>
                  <select
                    name="category"
                    id="category"
                    className="outline-none rounded-md text-black font-normal"
                  >
                    <option value="all">All</option>
                    <option value="paket">Paket</option>
                    <option value="makan">Makan</option>
                    <option value="minum">Minum</option>
                  </select>
                </th>
                <th className="text-start px-4 py-2 xl:py-4">Price</th>
                <th className="text-start px-4 py-2 xl:py-4">Profit</th>
                <th className="text-start px-4 py-2 xl:py-4">Action</th>
              </tr>
            </thead>
            <tbody className="">
              {data?.map((item) => (
                <tr key={item.name} id={item.name}>
                  <td className="px-4 py-2 xl:py-4">
                    <div className="w-[50px] h-[50px] bg-red-500 rounded-md"></div>
                  </td>
                  <td className="px-4 py-2 xl:py-4">{item.name}</td>
                  <td className="px-4 py-2 xl:py-4">{item.category}</td>
                  <td className="px-4 py-2 xl:py-4">{item.price}</td>
                  <td className="px-4 py-2 xl:py-4">{item.profit}</td>
                  <td className="px-4 py-2 xl:py-4 text-center">
                    <div className="flex gap-x-2">
                      <div
                        className="flex justify-center items-center relative cursor-pointer"
                        onClick={(e) => {
                          console.log(
                            e.target.parentElement.parentElement.parentElement
                              .parentElement.id
                          );
                        }}
                      >
                        <div className="absolute top-0 right-0 left-0 bottom-0 z-10 bg-transparent"></div>
                        <FiEdit style={{ color: "#0b8003" }} />
                      </div>
                      <div
                        className="relative cursor-pointer"
                        onClick={deleteProduct}
                      >
                        <div className="absolute top-0 right-0 left-0 bottom-0 z-10 bg-transparent"></div>
                        <DeleteIcon
                          style={{
                            color: "#b50b0b",
                            fontSize: "large",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Modal open={open}>
        <div className="w-[700px] h-[500px] outline-none bg-white rounded-md absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] p-7 flex flex-col justify-center gap-y-14">
          <h1 className="text-center text-2xl font-semibold">
            ADD NEW PRODUCT
          </h1>
          <form
            onSubmit={formik.handleSubmit}
            className="text-sm flex flex-col gap-y-10"
          >
            <div className="w-full flex justify-between">
              <div className="w-1/2 flex flex-col gap-y-5">
                <div className="w-full h-fit flex flex-col gap-y-2">
                  <label htmlFor="name">Name</label>
                  <input
                    required
                    type="text"
                    name="name"
                    id="name"
                    className="border-2 border-black rounded-md h-[35px] px-3"
                    placeholder="Nama Menu.."
                    onChange={handleFormChange}
                  />
                </div>
                <div className="w-full h-fit flex flex-col gap-y-2">
                  <label htmlFor="category">Category</label>
                  <select
                    required
                    name="category"
                    id="category"
                    className="border-2 border-black rounded-md h-[35px] px-3"
                    onChange={handleFormChange}
                  >
                    <option value="">-- Pilih Kategori --</option>
                    <option value="paket">Paket</option>
                    <option value="makan">Makan</option>
                    <option value="minum">Minum</option>
                  </select>
                </div>
                <div className="w-full h-fit flex flex-col gap-y-2">
                  <label htmlFor="price">Price (Rp)</label>
                  <input
                    required
                    type="number"
                    name="price"
                    id="price"
                    className="border-2 border-black rounded-md h-[35px] px-3"
                    placeholder="Harga Menu.."
                    onChange={handleFormChange}
                  />
                </div>
                <div className="w-full h-fit flex flex-col gap-y-2">
                  <label htmlFor="profit">Profit (Rp)</label>
                  <input
                    required
                    type="number"
                    name="profit"
                    id="profit"
                    className="border-2 border-black rounded-md h-[35px] px-3"
                    placeholder="Keuntungan"
                    onChange={handleFormChange}
                  />
                </div>
              </div>
              <div className="w-1/2 h-full flex flex-col items-center justify-center px-3">
                <label htmlFor="inputGambar">
                  <div className="bg-gray-300 w-[200px] h-[200px] rounded-[50px] flex flex-col justify-center items-center overflow-hidden">
                    {image ? (
                      <img src={image} alt="photo" className="w-full h-full" />
                    ) : (
                      <>
                        <AddAPhotoIcon />
                        <span className="font-semibold">Add Product Photo</span>
                      </>
                    )}
                  </div>
                </label>
                <input
                  type="file"
                  required
                  id="inputGambar"
                  name="photo"
                  className=""
                  onChange={handleFormChange}
                />
              </div>
            </div>
            <div className="flex justify-end gap-x-2 font-semibold">
              <button
                type="submit"
                className="w-[90px] h-[30px] rounded-md text-white bg-blue-500 flex justify-center items-center"
              >
                Tambah
              </button>
              <button
                type="button"
                onClick={handleCloseModal}
                className="w-[90px] h-[30px] rounded-md text-blue-500 bg-white flex justify-center items-center"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Products;

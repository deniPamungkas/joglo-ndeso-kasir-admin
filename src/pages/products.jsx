import DeleteIcon from "@mui/icons-material/Delete";
import { useContext, useState } from "react";
import { FiEdit } from "react-icons/fi";
import axios from "axios";
import { NavContext } from "../context/navContext";
import { Modal } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useFormik } from "formik";

const Products = () => {
  const { open, setOpen } = useContext(NavContext);
  const [edit, setEdit] = useState(false);

  const handleCloseModal = () => {
    setOpen(false);
    setEdit(false);
    window.localStorage.removeItem("item");
    formik.setValues({
      name: "",
      category: "",
      price: "",
      profit: "",
    });
  };

  const handleFormChange = (e) => {
    formik.setFieldValue(e.target.name, e.target.value);
  };

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      try {
        const result = await axios.get(
          "https://joglo-ndeso-kasir-api-dev.vercel.app/products",
          {
            withCredentials: true,
          }
        );
        return result.data;
      } catch (error) {
        return error;
      }
    },
    queryKey: ["form"],
  });

  const productMutation = useMutation({
    mutationFn: async (item) => {
      if (edit) {
        try {
          const edit = await axios.patch(
            "https://joglo-ndeso-kasir-api-dev.vercel.app/products/" + item.id,
            {
              name: item.name,
              category: item.category,
              price: item.price,
              profit: item.profit,
            },
            { withCredentials: true }
          );
          setOpen(false);
          setEdit(false);
          formik.setValues({
            name: "",
            category: "",
            price: "",
            profit: "",
          });
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Berhasil Mengupdate Menu!",
            showConfirmButton: false,
            timer: 2000,
          });
          window.localStorage.removeItem("item");
          return edit;
        } catch (error) {
          console.log(error);
          setOpen(false);
          setEdit(false);
          formik.setValues({
            name: "",
            category: "",
            price: "",
            profit: "",
          });
          Swal.fire({
            position: "center",
            icon: "error",
            title: error.response.data.errMessage,
            showConfirmButton: false,
            timer: 2000,
          });
          window.localStorage.removeItem("item");
        }
      } else {
        try {
          const result = await axios.post(
            "https://joglo-ndeso-kasir-api-dev.vercel.app/products",
            formik.values,
            { withCredentials: true }
          );
          console.log(formik.values);
          setOpen(false);
          setEdit(false);
          formik.setValues({
            name: "",
            category: "",
            price: "",
            profit: "",
          });
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
          setEdit(false);
          formik.setValues({
            name: "",
            category: "",
            price: "",
            profit: "",
          });
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
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["form"] });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (productName) => {
      try {
        const response = await axios.delete(
          "https://joglo-ndeso-kasir-api-dev.vercel.app/products?name=" +
            productName,
          {
            withCredentials: true,
          }
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
    productMutation.mutate(formik.values);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      price: "",
      profit: "",
    },
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
  const handleEditMenu = async (e) => {
    try {
      setEdit(true);
      const editMenu =
        e.target.parentElement.parentElement.parentElement.parentElement.id;
      const dataToEdit = data.filter((menu) => {
        return menu.name == editMenu;
      })[0];
      formik.setValues({
        name: dataToEdit.name,
        category: dataToEdit.category,
        price: dataToEdit.price,
        profit: dataToEdit.profit,
        id: dataToEdit._id,
      });

      return setOpen(true);
    } catch (error) {
      return error;
    }
  };
  return (
    <div className="w-full h-screen p-3">
      <div className=" w-full h-[510px] overflow-scroll relative">
        {isLoading ? (
          <div className="m-auto font-bold text-5xl">loading</div>
        ) : (
          <table className="bg-white rounded-md w-full text-sm lg:text-lg">
            <thead className="border-b-2 sticky top-0 z-20 bg-blue-500 text-white text-xs md:text-sm lg:text-base">
              <tr>
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
                <th className="text-start px-4 py-2 xl:py-4">Action</th>
              </tr>
            </thead>
            <tbody className="">
              {data?.map((item) => (
                <tr
                  key={item.name}
                  id={item.name}
                  className="odd:bg-white even:bg-slate-200 h-[50px] text-[10px] md:text-sm lg:text-base"
                >
                  <td className="px-4 py-2 xl:py-4">{item.name}</td>
                  <td className="px-4 py-2 xl:py-4">{item.category}</td>
                  <td className="px-4 py-2 xl:py-4">{`Rp. ${new Intl.NumberFormat(
                    "id-ID"
                  ).format(item.price)}`}</td>
                  <td className="px-4 py-2 xl:py-4 text-center">
                    <div className="flex gap-x-2">
                      <div
                        className="flex justify-center items-center relative cursor-pointer"
                        onClick={handleEditMenu}
                      >
                        <div className="absolute top-0 right-0 left-0 bottom-0 z-10 bg-transparent text-[10px] md:text-sm lg:text-base"></div>
                        <FiEdit
                          style={{ color: "#0b8003", fontSize: "inherit" }}
                        />
                      </div>
                      <div
                        className="flex justify-center items-center relative cursor-pointer"
                        onClick={deleteProduct}
                      >
                        <div className="absolute top-0 right-0 left-0 bottom-0 z-10 bg-transparent text-[10px] md:text-sm lg:text-base"></div>
                        <DeleteIcon
                          style={{
                            color: "#b50b0b",
                            fontSize: "inherit",
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
        <div className="w-screen md:w-[700px] h-[500px] outline-none bg-white rounded-md absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] p-7 flex flex-col justify-center gap-y-14">
          <h1 className="text-center text-2xl font-semibold">
            {edit ? "EDIT PRODUCT" : "ADD NEW PRODUCT"}
          </h1>
          <form
            onSubmit={formik.handleSubmit}
            className="text-sm flex flex-col gap-y-10"
          >
            <div className="w-full flex justify-between">
              <div className="w-full flex flex-col gap-y-5">
                <div className="w-full h-fit flex flex-col gap-y-2">
                  <label htmlFor="name">Name</label>
                  <input
                    required
                    type="text"
                    name="name"
                    id="name"
                    value={formik.values.name}
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
                    value={formik.values.category}
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
                    value={formik.values.price}
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
                    value={formik.values.profit}
                    className="border-2 border-black rounded-md h-[35px] px-3"
                    placeholder="Keuntungan"
                    onChange={handleFormChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-x-2 font-semibold">
              <button
                type="submit"
                className={`w-[90px] h-[30px] rounded-md text-white flex justify-center items-center ${
                  productMutation.isPending ? "bg-gray-500" : "bg-blue-500"
                }`}
              >
                {edit ? "Update" : "Tambah"}
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

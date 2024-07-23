import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { sumArray } from "../utils/getArraySum";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const Invoice = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState(null);
  const [searchMenu, setSearchMenu] = useState("");
  const [debouncedSearchMenu] = useDebounce(searchMenu, 300);
  const queryClient = useQueryClient();

  const invoiceNameMutation = useMutation({
    mutationFn: async () => {
      try {
        const result = await axios.get(
          "http://localhost:5600/invoice/invoice-name/" + params.id,
          {
            withCredentials: true,
          }
        );
        return result.data;
      } catch (error) {
        return error;
      }
    },
    mutationKey: ["invoiceNameMutation"],
    onSuccess: (data) => {
      setName(data?.data?.name);
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });

  useEffect(() => {
    invoiceNameMutation.mutate();
  }, []);

  const products = useQuery({
    queryFn: async () => {
      try {
        const result = await axios.get("http://localhost:5600/products", {
          withCredentials: true,
        });
        return result.data;
      } catch (error) {
        return error;
      }
    },
    queryKey: ["getAllProducts"],
  });

  const invoices = useQuery({
    queryFn: async () => {
      try {
        const result = await axios.get(
          "http://localhost:5600/invoice?name=" + name,
          {
            withCredentials: true,
          }
        );
        return result.data;
      } catch (error) {
        return error;
      }
    },
    staleTime: 0,
    queryKey: ["invoices"],
    enabled: name != null,
  });

  const addInvoiceMutation = useMutation({
    mutationFn: async (item) => {
      try {
        const result = await axios.post("http://localhost:5600/invoice", item, {
          withCredentials: true,
        });
        return result.data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    mutationKey: ["addInvoiceMutation"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });

  const deleteInvoiceMutation = useMutation({
    mutationFn: async (item) => {
      //kerjakan delete invoice
      try {
        if (item.amount > 1) {
          const result = await axios.patch(
            "http://localhost:5600/invoice",
            item,
            { withCredentials: true }
          );
          return result;
        } else {
          const result = await axios.delete(
            "http://localhost:5600/invoice?id=" + item.id,
            { withCredentials: true }
          );
          return result;
        }
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    mutationKey: ["addInvoiceMutation"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });

  const handleAddInvoice = (e) => {
    const item = products?.data?.find((item) => {
      return item.name == e.target.parentElement.parentElement.parentElement.id;
    });
    if (item) {
      const { name, category, price, amount } = item;
      const newInvoice = {
        name: invoiceNameMutation.data?.data?.name,
        menuName: name,
        category,
        price,
        amount,
      };
      addInvoiceMutation.mutate(newInvoice);
    }
  };

  const handleDeleteInvoice = (e) => {
    const item = invoices?.data?.data.find((item) => {
      return item.menuName == e.target.parentElement.parentElement.id;
    });
    if (item) {
      const { name, category, price, amount, menuName, _id } = item;
      const invoice = {
        id: _id,
        name,
        menuName,
        category,
        price,
        amount,
      };
      deleteInvoiceMutation.mutate(invoice);
    }
  };

  const handleDeleteInvoiceName = async () => {
    Swal.fire({
      title: "Yakin hapus invoice " + name + "?",
      text: "Periksa lagi apakah sudah benar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus invoice ini!",
    })
      .then(async (item) => {
        if (item.isConfirmed) {
          try {
            const result = await axios.delete(
              "http://localhost:5600/invoice/invoice-name?id=" + params.id,
              { withCredentials: true }
            );
            Swal.fire({
              title: "Invoice berhasil dihapus!",
              text:
                "invoice " +
                result?.data?.data?.name +
                " telah berhasil  dihapus",
              icon: "success",
            });
            return navigate("/pesanan");
          } catch (error) {
            console.log(error);
            return error;
          }
        }
      })
      .catch((item) => {
        console.log(item);
      });
  };

  const filteredProducts = () => {
    const asd = products?.data?.map((item) => {
      item.name = item.name.toLowerCase();
      return item;
    });
    return asd?.filter((product) => {
      return product?.name?.includes(debouncedSearchMenu);
    });
  };

  const handleBayarMutation = useMutation({
    mutationFn: async () => {
      try {
        Swal.fire({
          title: "Yakin bayar invoice " + name + "?",
          text: "Periksa lagi apakah sudah benar!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya, bayar invoice ini!",
        })
          .then(async (item) => {
            if (item.isConfirmed) {
              try {
                const order = invoices?.data?.data?.map((data) => {
                  const { name, menuName, category, amount, price } = data;
                  return { name, menuName, category, amount, price };
                });
                const bayarInvoice = await axios.post(
                  "http://localhost:5600/orders",
                  { data: order },
                  { withCredentials: true }
                );
                await axios.delete(
                  "http://localhost:5600/invoice/invoice-name?id=" + params.id,
                  { withCredentials: true }
                );
                Swal.fire({
                  title: "Invoice berhasil dibayar!",
                  text:
                    "invoice " +
                    bayarInvoice?.data?.data?.name +
                    " telah berhasil  dibayar",
                  icon: "success",
                });
                return navigate("/pesanan");
              } catch (error) {
                console.log(error);
                return error;
              }
            }
          })
          .catch((item) => {
            console.log(item);
          });
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    mutationKey: ["handleBayarMutation"],
    // onSuccess: async () => {
    //   try {
    //     const result = await axios.delete(
    //       "http://localhost:5600/invoice/invoice-name?id=" + params.id,
    //       { withCredentials: true }
    //     );
    //     return result;
    //   } catch (error) {
    //     console.log(error);
    //     return error;
    //   }
    // },
  });

  return (
    <div className="bg-gray-100 min-h-screen px-3 py-3">
      <div className="w-full h-[50px] bg-white flex justify-center items-center text-xl font-semibold rounded-lg">
        <h1>
          {invoiceNameMutation.isPending
            ? "-"
            : invoiceNameMutation.data?.data?.name}
        </h1>
      </div>
      {invoices.isFetching && invoices.isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full text-sm xl:text-base border-separate border-spacing-0.5 rounded-2xl overflow-hidden mt-3">
          <tbody className="text-xs">
            {invoices?.data?.data?.length != 0 &&
              invoices?.data?.data.map((invoice) => {
                return (
                  <tr
                    key={invoice._id}
                    id={invoice.menuName}
                    className="h-[50px] bg-white"
                  >
                    <td className="px-4 py-2 xl:py-4 flex justify-center items-center h-[50px]">
                      {invoice.amount}
                    </td>
                    <td className="px-4 py-2 xl:py-4">{invoice.menuName}</td>
                    <td className="px-4 py-2 xl:py-4">{`Rp. ${new Intl.NumberFormat(
                      "id-ID"
                    ).format(invoice.price * invoice.amount)}`}</td>
                    <td className="px-4 py-2 xl:py-4 h-[50px] flex justify-center items-center relative">
                      <div
                        className="absolute w-[15px] h-[20px] m-auto z-10 bg-transparent"
                        onClick={handleDeleteInvoice}
                      ></div>
                      <DeleteIcon
                        style={{
                          color: "#334155",
                          fontSize: "17px",
                          cursor: "pointer",
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
      <div className="w-full h-[50px] bg-slate-900 flex justify-center items-center text-lg font-semibold my-2 text-white rounded-lg">
        <h2>Total</h2>:{" "}
        {invoices?.data?.data?.length && !invoices.isFetching ? (
          <span>{`Rp. ${new Intl.NumberFormat("id-ID").format(
            sumArray(invoices?.data?.data)
          )}`}</span>
        ) : (
          "-"
        )}
      </div>
      <button
        className="w-full h-[50px] bg-green-500 text-lg font-semibold rounded-lg text-white"
        type="button"
        onClick={() => {
          handleBayarMutation.mutate();
        }}
      >
        Bayar
      </button>
      <section className="my-5">
        <input
          type="text"
          placeholder="cari..."
          className="w-full h-[30px] outline-none border-b-2 mb-3 text-xs px-2"
          value={searchMenu}
          onChange={(e) => {
            setSearchMenu(e.target.value);
          }}
        />
        {products?.isLoading ? (
          <h1>Loading</h1>
        ) : (
          <div className="h-[400px] overflow-scroll">
            <table className="bg-white w-full text-xs xl:text-base">
              <thead className="border-b-2 sticky top-0 z-20 bg-slate-700 h-[50px] text-white">
                <tr>
                  <th className="text-start px-4 py-2 xl:py-4">Name</th>
                  <th className="text-start px-4 py-2 xl:py-4">Price</th>
                  <th className="text-start px-4 py-2 xl:py-4">Action</th>
                </tr>
              </thead>
              <tbody className="">
                {filteredProducts().map((item) => (
                  <tr
                    key={item.name}
                    id={item.name}
                    className="h-[50px] even:bg-slate-200 odd:bg-white"
                  >
                    <td className="px-4 py-2 xl:py-4">{item.name}</td>
                    <td className="px-4 py-2 xl:py-4">{`Rp. ${new Intl.NumberFormat(
                      "id-ID"
                    ).format(item.price)}`}</td>
                    <td className="px-4 py-2 xl:py-4 text-center">
                      <div className="flex gap-x-2">
                        <button
                          className="w-[40px] h-[17px] rounded-sm font-semibold text-white bg-slate-800 text-[8px] flex justify-center items-center"
                          onClick={handleAddInvoice}
                        >
                          Add
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      <button
        className="w-full h-[50px] bg-red-600 text-lg font-semibold rounded-lg text-white"
        type="button"
        onClick={handleDeleteInvoiceName}
      >
        Hapus Invoice
      </button>
    </div>
  );
};

export default Invoice;

import AddIcon from "@mui/icons-material/Add";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Modal } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";

const Pesanan = () => {
  const [openModal, setOpenModal] = useState(false);
  const [invoiceName, setInvoiceName] = useState("");
  const [invoiceNameDebounce] = useDebounce(invoiceName, 500);
  const [loading, setLoading] = useState(false);
  const [responseError, setResponseError] = useState("");
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchInvoiceName = async () => {
      try {
        setLoading(true);
        const name = await axios.get(
          `https://joglo-ndeso-kasir-api-dev.vercel.app/invoice/invoice-name?name=${invoiceNameDebounce}`,
          { withCredentials: true }
        );
        setResponseError(name);
        return name;
      } catch (error) {
        setLoading(true);
        setResponseError(error.response);
        return error.response;
      } finally {
        setLoading(false);
      }
    };
    invoiceNameDebounce != "" ? fetchInvoiceName() : null;
  }, [invoiceNameDebounce]);

  const allInvoices = useQuery({
    queryFn: async () => {
      try {
        const result = await axios.get(
          "https://joglo-ndeso-kasir-api-dev.vercel.app/invoice/invoice-names",
          {
            withCredentials: true,
          }
        );
        return result.data;
      } catch (error) {
        return error;
      }
    },
    queryKey: ["getAllInvoices"],
  });

  const invoiceNameMutation = useMutation({
    mutationFn: async () => {
      if (responseError.status == 200) {
        try {
          const newInvoiceName = await axios.post(
            `https://joglo-ndeso-kasir-api-dev.vercel.app/invoice/invoice-name`,
            { name: invoiceNameDebounce },
            { withCredentials: true }
          );
          return newInvoiceName.data;
        } catch (error) {
          return error;
        }
      }
    },
    mutationKey: ["invoiceNameMutation"],
    onSuccess: (data) => {
      setOpenModal(false);
      setInvoiceName("");
      setResponseError("");
      navigate("/invoice/" + data.data?._id);
      queryClient.invalidateQueries({ queryKey: ["getAllInvoices"] });
    },
  });

  const handleInvoiceName = () => {
    invoiceNameMutation.mutate();
  };

  const confilrmLogin = useQuery({
    queryFn: async () => {
      try {
        const isLoggedIn = axios.get(
          "https://joglo-ndeso-kasir-api-dev.vercel.app/auth/is-logged-in",
          { withCredentials: true }
        );
        return isLoggedIn;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    queryKey: ["confirmLogin"],
  });

  return (
    <>
      <div className="px-4 py-4 gap-4 md:px-5 md:py-6 md:gap-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
        <Link to={"/"}>
          <div className="w-[150px] h-[150px] md:w-[170px] md:h-[170px] m-auto border cursor-pointer border-black rounded-lg bg-white shadow-lg relative flex justify-center items-center">
            <HomeOutlinedIcon fontSize="large" />
          </div>
        </Link>
        <div
          onClick={() => setOpenModal(true)}
          className="w-[150px] h-[150px] md:w-[170px] md:h-[170px] m-auto border cursor-pointer border-black rounded-lg bg-white shadow-lg relative flex justify-center items-center"
        >
          <AddIcon fontSize="large" />
        </div>
        {confilrmLogin?.data == undefined ? (
          <div className=" w-full h-fit">Not Logged In</div>
        ) : (
          allInvoices?.data?.data?.map((invoice) => {
            return (
              <Link to={`/invoice/${invoice._id}`} key={invoice.name}>
                <div className="w-[150px] h-[150px] md:w-[170px] md:h-[170px] m-auto border border-black rounded-lg bg-white shadow-lg relative flex justify-center items-center font-semibold text-2xl">
                  <span>{invoice.name}</span>
                </div>
              </Link>
            );
          })
        )}

        <Modal open={openModal}>
          <div className="bg-white w-[300px] min-h-[100px] m-auto mt-40 p-2 outline-none flex flex-col justify-between gap-y-2">
            <input
              onChange={(e) => {
                setInvoiceName(e.target.value);
              }}
              value={invoiceName}
              type="text"
              placeholder="invoice name.."
              className="w-full h-[35px] outline-none border-[1px] border-black px-2 text-sm"
            />
            {invoiceName != "" && (
              <div
                className={`w-full h-[30px] flex justify-center items-center text-xs font-semibold ${
                  responseError?.status == 200 && "text-green-700 bg-green-300"
                } ${responseError?.status == 409 && "text-red-700 bg-red-300"}`}
              >
                <p>{responseError?.data?.message}</p>
              </div>
            )}
            <div className="flex w-full justify-end items-center gap-x-2">
              <button
                type="button"
                disabled={loading || responseError?.status !== 200}
                onClick={handleInvoiceName}
                className="bg-slate-900 disabled:bg-slate-300 disabled:cursor-not-allowed cursor-pointer text-white font-semibold text-sm w-[60px] h-[30px] rounded-md flex justify-center
             items-center"
              >
                create
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpenModal(false);
                  setInvoiceName("");
                  setResponseError("");
                }}
                className="text-slate-900 font-semibold text-sm w-[60px] h-[30px] flex justify-center
             items-center"
              >
                cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Pesanan;

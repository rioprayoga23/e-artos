import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../components/layouts/MainLayout";
import { chooseRecipient } from "../redux/reducers/transactions";
import { Search } from "react-feather";
import WithAuth from "../components/HOC/WithAuth";
import Image from "next/image";
import http from "../helpers/http";
import Spinner from "../components/Spinner";

const Reciever = () => {
  const { token } = useSelector((state) => state.auth);

  const [currentPage, setCurrentPage] = useState(1);
  const [recipient, setRecipient] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleChoose = (id) => {
    dispatch(chooseRecipient({ recipientId: id }));
    router.push("/amount");
  };

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    const getRecipient = async () => {
      try {
        setIsLoading(true);
        const { data } = await http(token).get(
          `/transactions/recipient?page=${currentPage}&limit=5`
        );
        setRecipient(data.results);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    getRecipient();
  }, [token, currentPage]);

  return (
    <MainLayout>
      <div className="bg-white p-3 rounded-lg shadow-md w-full min-h-screen">
        <div className="mb-10">
          <h3 className="font-semibold mb-5">Search Reciever</h3>
          <div className="py-2 px-5 bg-[#3A3D421A] rounded-md flex items-center">
            <div className="flex flex-1 gap-5">
              <Search />
              <input
                type="text"
                className="outline-none w-full bg-transparent"
                placeholder="Search receiver here"
              />
            </div>
            <div className="bg-third py-2 px-5 rounded-md cursor-pointer md:hidden">
              Search
            </div>
          </div>
          <div className="bg-third py-2 px-5 rounded-md cursor-pointer md:block hidden mt-3 text-center">
            Search
          </div>
        </div>
        <div className="flex flex-col gap-5">
          {isLoading ? (
            <div className="flex justify-center">
              <Spinner />
            </div>
          ) : (
            recipient.map((data) => {
              return (
                <div
                  className="flex justify-between items-center shadow-md p-4 rounded-lg cursor-pointer"
                  onClick={(e) => handleChoose(data.id)}
                  key={data.id}
                >
                  <div className="flex gap-3 items-center">
                    {data.picture ? (
                      <Image
                        src={process.env.NEXT_PUBLIC_IMAGE_URL + data?.picture}
                        alt="profile"
                        className="w-[60px] h-[60px] rounded-lg"
                        width={60}
                        height={60}
                      />
                    ) : (
                      <Image
                        src="/img/profile.jpg"
                        alt="profile"
                        className="w-[60px] h-[60px] rounded-lg"
                        width={60}
                        height={60}
                      />
                    )}
                    <div>
                      <h3 className="font-semibold">{`${data.firstName} ${data.lastName}`}</h3>
                      <p className="text-sm">{data.phoneNumber}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <div className="btn-group grid grid-cols-2 mt-5">
        {currentPage > 1 ? (
          <button
            className="btn bg-primary hover:bg-primary"
            onClick={handlePrev}
          >
            Previous page
          </button>
        ) : (
          <button
            disabled={true}
            className="btn btn-outline"
            onClick={handlePrev}
          >
            Previous page
          </button>
        )}

        <button
          className="btn bg-primary hover:bg-primary"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </MainLayout>
  );
};

export default WithAuth(Reciever);

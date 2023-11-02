import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BsArrowLeft } from "react-icons/bs";
import Dropzone from "react-dropzone";
import { AiOutlineCloseCircle } from "react-icons/ai";
//service
import "./style.scss";
//assets
import cloudIcon from "../../../../assets/images/uploadcloud.svg";
import closeIcon from "assets/images/closeIcon.png";
import editIcon from "assets/images/editIcon.svg";
import deleteIcon from "assets/images/deleteIcon.svg";
//internal components
import InputBox from "component/common/InputBox/InputBox";
import Loader from "component/common/Loader";
import CustomController from "component/common/Controller";
import NormalButton from "component/common/NormalButton/NormalButton";
import FormErrorMessage from "component/common/ErrorMessage";
import NormalMultiSelect from "component/common/NormalMultiSelect";
import SuccessModal from "component/common/DeleteModal/SuccessModal";
import ProductPopup from "./ProductPopup";
import DeleteModal from "component/common/DeleteModal/DeleteModal";
//service
import {
  updateProduct,
  getProduct,
  listProductDetails,
  editProductDetails,
  deleteProductDetails,
} from "service/Cms";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { uploadImage } from "service/Auth";
import { Toast } from "service/toast";
import { Table } from "antd";
//helpers
import { history } from "helpers";
import ReactPaginate from "react-paginate";

const AddProductcomp = ({ create, view, remove }) => {
  const {
    register,
    handleSubmit,
    errors,
    reset,
    control,
    getValues,
    setValue,
  } = useForm({
    mode: "onChange",
  });
  const [icon, setIcon] = useState("");
  const [newIcon, setNewIcon] = useState("");
  const [edit, setEdit] = useState(false);
  const [editPopup, setEditPopup] = useState(false);
  const [modal, setModal] = useState(false);
  const [productModal, setProductModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newProductImg, setNewProductImg] = useState(null);
  const [ProductIcon, setProductIcon] = useState("");
  const [productImage, setProductImage] = useState("");
  const [newProductImage, setNewProductImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [productType, setProductType] = useState("");
  const [benefits, setBenefits] = useState([{ benefitIcon: "", name: "" }]);
  const [isLoadList, setIsLoadList] = useState(benefits.map(() => false));
  const [columnData, setColumnData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [aboutUs, setAboutUs] = useState("");
  const [keyFeature, setKeyFeature] = useState("");
  const [otherBenefit, setOtherBenefit] = useState("");
  const [policyDoc, setPolicyDoc] = useState("");
  const [policyNotCover, setPolicyNotCover] = useState("");
  const [description, setDescription] = useState("");
  const [productData, setProductData] = useState([]);
  const [modalVisible, setModalVisible] = useState({
    id: null,
    show: false,
  });

  const addBenefit = () => {
    setBenefits([...benefits, { name: "", benefitIcon: "" }]);
  };

  const removeBenefit = (index) => {
    const updatedBenefits = benefits.filter((_, i) => i !== index);
    setBenefits(updatedBenefits);
  };

  const handleDropBenefit = (index) => async (droppedimage) => {
    let benefitIndex = index;
    try {
      let body = new FormData();
      setIsLoadList((prevIsLoadList) => {
        const updatedIsLoadList = [...prevIsLoadList];
        updatedIsLoadList[benefitIndex] = true;
        return updatedIsLoadList;
      });
      for (let index = 0; index < droppedimage.length; index++) {
        const file = droppedimage[index];
        body.append("data", file);
        let response = await uploadImage(body);
        if (response.status === 200) {
          const updatedBenefits = [...benefits];
          updatedBenefits[benefitIndex].benefitIcon =
            response?.data?.data?.data?.s3URL;
          setBenefits(updatedBenefits);
          setIsLoadList((prevIsLoadList) => {
            const updatedIsLoadList = [...prevIsLoadList];
            updatedIsLoadList[benefitIndex] = false;
            return updatedIsLoadList;
          });
        }
      }
    } catch (e) {
      console.log("e :>> ", e);
      setIsLoadList((prevIsLoadList) => {
        const updatedIsLoadList = [...prevIsLoadList];
        updatedIsLoadList[benefitIndex] = false;
        return updatedIsLoadList;
      });
    }
  };

  const options = [
    {
      label: "Mutual Funds",
      value: "mutualFunds",
    },
    {
      label: "IPO",
      value: "ipo",
    },
    {
      label: "Sovereign Gold Bonds",
      value: "sovereign gold bonds",
    },
    // {
    //   label: "Gold Bond",
    //   value: "goldBond",
    // },
    {
      label: "Insurance",
      value: "insurance",
    },
    {
      label: "Fixed Income",
      value: "fixedIncome",
    },
    {
      label: "Loan",
      value: "loan",
    },
    {
      label: "Portfolio Management System",
      value: "portfolioManagementSystem",
    },
    {
      label: "Portfolio Analyser & Optimizer",
      value: " portfolioAnalyserAndOptimizer",
    },
    {
      label: "Algo Trading Platform",
      value: "AlgoTradingPlatform",
    },
  ];
  const id = localStorage.getItem("editId");

  useEffect(() => {
    if (id) {
      setEdit(true);
      getProductDetails();
    }
  }, []);

  const TableData = (productType) => {
    switch (productType) {
      case "sovereign gold bonds":
        setColumnData(columns);
        break;
      case "insurance":
        setColumnData(columnsInsurance);
        break;
      case "fixedIncome":
        setColumnData(columnsFixedIncome);
        break;
      case "loan":
        setColumnData(columnsFixedIncome);
        break;
      case "portfolioManagementSystem":
        setColumnData(columnsPms);
        break;
      case " portfolioAnalyserAndOptimizer":
        setColumnData(columnsAlgo);
        break;
      case "AlgoTradingPlatform":
        setColumnData(columnsAlgo);
        break;
      default:
        return setColumnData([]);
    }
  };

  const getProductDetails = async () => {
    try {
      const params = {
        productId: id,
      };
      let response = await getProduct(params);
      if (response.status === 200) {
        const data = response?.data?.data;
        reset({
          productName: data?.productName,
          productType: data?.productType,
        });
        setProductIcon(data?.productIconS3);
        setProductImage(data?.imagesS3);
        setBenefits(data?.benefits);
        setProductType(data?.productType);
        TableData(data?.productType);
        if (data?.productType === "sovereign gold bonds") {
          getDetails(1, "goldBond");
        } else if (data?.productType === " portfolioAnalyserAndOptimizer") {
          getDetails(1, "portfolioAnalyserAndOptimizer");
        } else {
          getDetails(1, data?.productType);
        }
      } else {
        Toast({ type: "error", message: response.data.message });
      }
    } catch (e) {
      console.log("errrr :>> ", e);
    }
  };

  const onsubmit = async (data) => {
    try {
      setLoading(true);
      let body;
      if (productType === "sovereign gold bonds") {
        body = {
          productName: data?.productName,
          productType: productType,
          productIcon: newProductImg ? newProductImg : ProductIcon,
          images: newProductImage ? newProductImage : productImage,
          benefits: benefits,
        };
      } else {
        body = {
          productName: data?.productName,
          productType: productType,
          productIcon: newProductImg ? newProductImg : ProductIcon,
        };
      }

      let response = await updateProduct(body, id);
      if (response.status === 200) {
        setModal(true);
        setTimeout(() => {
          setModal(false);
          reset();
          history.push("/admin/product-management");
        }, 2000);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDropImage = async (droppedimage) => {
    try {
      setIsLoad(true);
      let body = new FormData();
      for (let index = 0; index < droppedimage.length; index++) {
        const file = droppedimage[index];
        body.append("data", file);
        let response = await uploadImage(body);
        if (response.status == 200) {
          setNewProductImage(response?.data?.data?.data?.key);
          setProductImage(response?.data?.data?.data?.s3URL);
          setIsLoad(false);
        }
      }
    } catch (e) {
      console.log("e :>> ", e);
    }
  };

  const handleDrop = async (droppedimage) => {
    try {
      setIsLoading(true);
      let body = new FormData();
      for (let index = 0; index < droppedimage.length; index++) {
        const file = droppedimage[index];
        body.append("data", file);
        let response = await uploadImage(body);
        if (response.status == 200) {
          setNewProductImg(response?.data?.data?.data?.key);
          setProductIcon(response?.data?.data?.data?.s3URL);
          setIsLoading(false);
        }
      }
    } catch (e) {
      console.log("e :>> ", e);
    }
  };

  const cancelIcon = (e) => {
    e.stopPropagation();
    setProductIcon(null);
  };

  const cancelImg = (e) => {
    e.stopPropagation();
    setProductImage(null);
  };

  const columns = [
    {
      title: "Scheme Name",
      width: 100,
      dataIndex: "schemeName",
      key: "schemeName",
      fixed: "left",
    },
    {
      title: "Icon",
      width: 100,
      dataIndex: "icon",
      key: "icon",
      fixed: "left",
      render: (text, record) => (
        <div style={{ width: "30px", height: "30px" }}>
          {console.log("record", record)}
          <img src={record?.iconS3} alt="Icon" className="icon" />
        </div>
      ),
    },
    {
      title: "Subscription From",
      dataIndex: "subscriptionFrom",
      key: "subscriptionFrom",
      render: (text, record) => (
        <span>{new Date(record?.subscriptionFrom).toLocaleDateString()}</span>
      ),
    },
    {
      title: "Subscription To",
      dataIndex: "subscriptionTo",
      key: "subscriptionTo",
      render: (text, record) => (
        <span>{new Date(record.subscriptionTo).toLocaleDateString()}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Max Limit",
      dataIndex: "maxLimit",
      key: "maxLimit",
    },
    {
      title: "Date Of Issue",
      dataIndex: "dateOfIssue",
      key: "dateOfIssue",
      render: (text, record) => (
        <span>{new Date(record.dateOfIssue).toLocaleDateString()}</span>
      ),
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (text, record) => (
        <div className="actions">
          <img src={editIcon} alt="" onClick={() => handleEdit(record?._id)} />
          <img
            src={deleteIcon}
            alt=""
            className="pl-2"
            onClick={() => handleOpenModal(record?._id)}
          />
        </div>
      ),
    },
  ];

  const columnsInsurance = [
    {
      title: "Scheme Name",
      width: 100,
      dataIndex: "schemeName",
      key: "schemeName",
      fixed: "left",
    },
    {
      title: "Icon",
      width: 100,
      dataIndex: "icon",
      key: "icon",
      fixed: "left",
      render: (text, record) => (
        <div style={{ width: "30px", height: "30px" }}>
          {console.log("record", record)}
          <img src={record?.iconS3} alt="Icon" className="icon" />
        </div>
      ),
    },
    {
      title: "Plan Type",
      dataIndex: "planType",
      key: "planType",
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Insurance Type",
      dataIndex: "insuranceType",
      key: "insuranceType",
    },
    {
      title: "Insurance Plan",
      dataIndex: "insurancePlan",
      key: "insurancePlan",
    },
    {
      title: "Life Cover",
      dataIndex: "lifeCover",
      key: "lifeCover",
    },
    {
      title: "Claim Settle",
      dataIndex: "claimSettle",
      key: "claimSettle",
    },
    {
      title: "Cover Upto",
      dataIndex: "coverUpto",
      key: "coverUpto",
      render: (text, record) => (
        <span>{new Date(record?.coverUpto).toLocaleDateString()}</span>
      ),
    },
    {
      title: "About Us",
      dataIndex: "aboutUs",
      key: "aboutUs",
      render: (text, record) => {
        if (
          typeof record?.aboutUs === "string" &&
          /<[a-z][\s\S]*>/i.test(record?.aboutUs)
        ) {
          const textOnlyValue = record?.aboutUs.replace(/<[^>]+>/g, "");
          return (
            <>
              <span>{textOnlyValue}</span>
            </>
          );
        } else {
          return <span>{record?.aboutUs}</span>;
        }
      },
    },
    {
      title: "Key Feature",
      dataIndex: "keyFuture",
      key: "keyFuture",
      render: (text, record) => {
        if (
          typeof record?.keyFuture === "string" &&
          /<[a-z][\s\S]*>/i.test(record?.keyFuture)
        ) {
          const textOnlyValue = record?.keyFuture.replace(/<[^>]+>/g, "");
          return (
            <>
              <span>{textOnlyValue}</span>
            </>
          );
        } else {
          return <span>{record?.keyFuture}</span>;
        }
      },
    },
    {
      title: "Other Benefits",
      dataIndex: "otherBenefits",
      key: "otherBenefits",
      render: (text, record) => {
        if (
          typeof record?.otherBenefits === "string" &&
          /<[a-z][\s\S]*>/i.test(record?.otherBenefits)
        ) {
          const textOnlyValue = record?.otherBenefits.replace(/<[^>]+>/g, "");
          return (
            <>
              <span>{textOnlyValue}</span>
            </>
          );
        } else {
          return <span>{record?.otherBenefits}</span>;
        }
      },
    },
    {
      title: "Policy Does Not Cover",
      dataIndex: "policyDoesNotCover",
      key: "policyDoesNotCover",
      render: (text, record) => {
        if (
          typeof record?.policyDoesNotCover === "string" &&
          /<[a-z][\s\S]*>/i.test(record?.policyDoesNotCover)
        ) {
          const textOnlyValue = record?.policyDoesNotCover.replace(
            /<[^>]+>/g,
            ""
          );
          return (
            <>
              <span>{textOnlyValue}</span>
            </>
          );
        } else {
          return <span>{record?.policyDoesNotCover}</span>;
        }
      },
    },
    {
      title: "Policy Doc",
      dataIndex: "policyDoc",
      key: "policyDoc",
      render: (text, record) => {
        if (
          typeof record?.policyDoc === "string" &&
          /<[a-z][\s\S]*>/i.test(record?.policyDoc)
        ) {
          const textOnlyValue = record?.policyDoc.replace(/<[^>]+>/g, "");
          return (
            <>
              <span>{textOnlyValue}</span>
            </>
          );
        } else {
          return <span>{record?.policyDoc}</span>;
        }
      },
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (text, record) => (
        <div className="actions">
          <img src={editIcon} alt="" onClick={() => handleEdit(record?._id)} />
          <img
            src={deleteIcon}
            alt=""
            className="pl-2"
            onClick={() => handleOpenModal(record?._id)}
          />
        </div>
      ),
    },
  ];

  const columnsFixedIncome = [
    {
      title: "Scheme Name",
      width: 100,
      dataIndex: "schemeName",
      key: "schemeName",
      fixed: "left",
    },
    {
      title: "Icon",
      width: 100,
      dataIndex: "icon",
      key: "icon",
      fixed: "left",
      render: (text, record) => (
        <div style={{ width: "30px", height: "30px" }}>
          {console.log("record", record)}
          <img src={record?.iconS3} alt="Icon" className="icon" />
        </div>
      ),
    },
    {
      title: "Share Brochure",
      width: 100,
      dataIndex: "brochure",
      key: "brochure",
      fixed: "left",
      render: (text, record) => (
        <div style={{ width: "30px", height: "30px" }}>
          {console.log("record", record)}
          <img src={record?.brochureS3} alt="Icon" className="icon" />
        </div>
      ),
    },
    {
      title: "Plan Type",
      dataIndex: "planType",
      key: "planType",
    },
    {
      title: "Rate Of Interest",
      dataIndex: "rateOfInterest",
      key: "rateOfInterest",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text, record) => {
        if (
          typeof record?.description === "string" &&
          /<[a-z][\s\S]*>/i.test(record?.description)
        ) {
          const textOnlyValue = record?.description.replace(/<[^>]+>/g, "");
          return (
            <>
              <span>{textOnlyValue}</span>
            </>
          );
        } else {
          return <span>{record?.description}</span>;
        }
      },
    },
    {
      title: "Reference Title",
      dataIndex: "reference",
      key: "reference",
      render: (text, record) => (
        <div>
          {record.reference.map((ref, index) => (
            <ul key={index}>
              <li>{ref.title}</li>
            </ul>
          ))}
        </div>
      ),
    },
    {
      title: "Reference Video",
      dataIndex: "reference",
      key: "reference",
      render: (text, record) => (
        <div>
          {record.reference.map((ref, index) => (
            <ul key={index}>
              <li>{ref.video}</li>
            </ul>
          ))}
        </div>
      ),
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (text, record) => (
        <div className="actions">
          <img src={editIcon} alt="" onClick={() => handleEdit(record?._id)} />
          <img
            src={deleteIcon}
            alt=""
            className="pl-2"
            onClick={() => handleOpenModal(record?._id)}
          />
        </div>
      ),
    },
  ];

  const columnsPms = [
    {
      title: "Scheme Name",
      width: 100,
      dataIndex: "schemeName",
      key: "schemeName",
      fixed: "left",
    },
    {
      title: "Icon",
      width: 100,
      dataIndex: "icon",
      key: "icon",
      fixed: "left",
      render: (text, record) => (
        <div style={{ width: "30px", height: "30px" }}>
          <img src={record?.iconS3} alt="Icon" className="icon" />
        </div>
      ),
    },
    {
      title: "Share Brochure",
      width: 100,
      dataIndex: "brochure",
      key: "brochure",
      fixed: "left",
      render: (text, record) => (
        <div style={{ width: "30px", height: "30px" }}>
          {console.log("record", record)}
          <img src={record?.brochureS3} alt="Icon" className="icon" />
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text, record) => {
        if (
          typeof record?.description === "string" &&
          /<[a-z][\s\S]*>/i.test(record?.description)
        ) {
          const textOnlyValue = record?.description.replace(/<[^>]+>/g, "");
          return (
            <>
              <span>{textOnlyValue}</span>
            </>
          );
        } else {
          return <span>{record?.description}</span>;
        }
      },
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <div style={{ width: "30px", height: "30px" }}>
          <img src={record?.imagesS3} alt="Icon" className="icon" />
        </div>
      ),
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (text, record) => (
        <div className="actions">
          <img src={editIcon} alt="" onClick={() => handleEdit(record?._id)} />
          <img
            src={deleteIcon}
            alt=""
            className="pl-2"
            onClick={() => handleOpenModal(record?._id)}
          />
        </div>
      ),
    },
  ];
  const columnsAlgo = [
    {
      title: "Scheme Name",
      width: 100,
      dataIndex: "schemeName",
      key: "schemeName",
      fixed: "left",
    },
    {
      title: "Icon",
      width: 100,
      dataIndex: "icon",
      key: "icon",
      fixed: "left",
      render: (text, record) => (
        <div style={{ width: "30px", height: "30px" }}>
          <img src={record?.iconS3} alt="Icon" className="icon" />
        </div>
      ),
    },
    {
      title: "Share Brochure",
      width: 100,
      dataIndex: "brochure",
      key: "brochure",
      fixed: "left",
      render: (text, record) => (
        <div style={{ width: "30px", height: "30px" }}>
          {console.log("record", record)}
          <img src={record?.brochureS3} alt="Icon" className="icon" />
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text, record) => {
        if (
          typeof record?.description === "string" &&
          /<[a-z][\s\S]*>/i.test(record?.description)
        ) {
          const textOnlyValue = record?.description.replace(/<[^>]+>/g, "");
          return (
            <>
              <span>{textOnlyValue}</span>
            </>
          );
        } else {
          return <span>{record?.description}</span>;
        }
      },
    },
    {
      title: "Reference Title",
      dataIndex: "reference",
      key: "reference",
      render: (text, record) => (
        <div>
          {record.reference.map((ref, index) => (
            <ul key={index}>
              <li>{ref.title}</li>
            </ul>
          ))}
        </div>
      ),
    },
    {
      title: "Reference Video",
      dataIndex: "reference",
      key: "reference",
      render: (text, record) => (
        <div>
          {record.reference.map((ref, index) => (
            <ul key={index}>
              <li>{ref.video}</li>
            </ul>
          ))}
        </div>
      ),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <div style={{ width: "30px", height: "30px" }}>
          <img src={record?.imagesS3} alt="Icon" className="icon" />
        </div>
      ),
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (text, record) => (
        <div className="actions">
          <img src={editIcon} alt="" onClick={() => handleEdit(record?._id)} />
          <img
            src={deleteIcon}
            alt=""
            className="pl-2"
            onClick={() => handleOpenModal(record?._id)}
          />
        </div>
      ),
    },
  ];

  const handleEdit = async (id) => {
    try {
      const params = {
        id: id,
      };
      let response = await editProductDetails(params);
      if (response.status === 200) {
        console.log("response", response?.data?.data);
        setProductData(response?.data?.data);
        setEditPopup(true);
        setProductModal(true);
      }
    } catch (e) {
      console.log("errrr :>> ", e);
    }
  };

  const handleOpenModal = (id) => {
    setModalVisible({
      id: id,
      show: true,
    });
  };

  const handleDelete = async () => {
    try {
      if (modalVisible.show && modalVisible.id) {
        const params = {
          id: modalVisible.id,
        };
        let response = await deleteProductDetails(params);
        if (response.status === 200) {
          Toast({ type: "success", message: response.data.message });
          if (productType === "sovereign gold bonds") {
            getDetails(1, "goldBond");
          } else if (productType === " portfolioAnalyserAndOptimizer") {
            getDetails(1, "portfolioAnalyserAndOptimizer");
          } else {
            getDetails(1, productType);
          }
          setModalVisible({ show: false, id: null });
        }
      }
    } catch (e) {
      console.log("errrr :>> ", e);
    }
  };

  const getDetails = async (page, type) => {
    try {
      const params = {
        page: page ? page : 1,
        limit: 10,
        productType: String(type),
      };
      let response = await listProductDetails(params);
      if (response.status === 200) {
        console.log("response", response?.data?.data?.list);
        setTableData(response?.data?.data?.list);
        setPageCount(response?.data?.data?.pageMeta?.pageCount);
        setCurrentPage(response?.data?.data?.pageMeta?.currentPage);
      }
    } catch (e) {
      console.log("errrr :>> ", e);
    }
  };

  const handlePageChange = (page) => {
    getDetails(page?.selected + 1, productType);
  };

  return (
    <>
      <div className="">
        <div className="addProduct px-5">
          <div className=" d-flex my-3 align-items-center ">
            <i className="">
              <BsArrowLeft
                onClick={() => history.goBack()}
                style={{ cursor: "pointer" }}
                size={28}
              />
            </i>
            <p className="add_products_title m-0">
              {edit ? "Edit Product" : "Add Product"}
            </p>
          </div>
          <div className="boder_box mb-4">
            <div className=" ">
              <p className="title_product">Product Details</p>
              <div className="row">
                <div className="col-6">
                  <label className="Product_description"> Product Name</label>
                  <InputBox
                    className="login_input"
                    type={"text"}
                    placeholder="Enter Product Name"
                    name="productName"
                    errors={errors}
                    register={register({
                      required: true,
                      pattern: /^(?!\s*$).+/,
                    })}
                  />
                  <FormErrorMessage
                    error={errors.productName}
                    messages={{
                      required: "Product Name is Required",
                      pattern: "Please Enter a Valid Name",
                    }}
                  />
                </div>
                <div class="col-6" style={{ zIndex: 100 }}>
                  <label className="Product_description">Product Type</label>
                  <CustomController
                    name={"productType"}
                    control={control}
                    error={errors?.productType}
                    defaultValue={getValues("productType")}
                    rules={{ required: true }}
                    messages={{ required: "Product Type is Required" }}
                    render={({ onChange, ...fields }) => {
                      return (
                        <NormalMultiSelect
                          {...fields}
                          placeholder={"Select Product Type"}
                          options={options}
                          name="productType"
                          value={productType}
                          handleChange={(e, { value } = {}) => {
                            onChange(value);
                            setProductType(value);
                            TableData(value);
                          }}
                        />
                      );
                    }}
                  />
                </div>
                {console.log(
                  'getValues("productType")',
                  getValues("productType")
                )}
                <div className="col-6 mt-3">
                  <label className="Product_description">Product Icon</label>
                  <Dropzone
                    onDrop={handleDrop}
                    accept=".png, .jpeg, .jpg, "
                    maxSize={3072000}
                    errors={errors}
                    {...register("dropZoneField", {
                      required: newProductImg || ProductIcon ? false : true,
                    })}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps({ className: "dropzone" })}>
                        <div className="   ">
                          <input {...getInputProps()} multiple={false} />
                          {ProductIcon ? (
                            <>
                              <img
                                src={ProductIcon}
                                alt="ProductIcon"
                                className="preview_image"
                              ></img>
                            </>
                          ) : (
                            <>
                              <div className=" drag_btn ">
                                <NormalButton
                                  onClick={(e) => e.preventDefault()}
                                  className="browse-button"
                                  label="Browse"
                                />
                              </div>
                            </>
                          )}
                          {isLoading ? (
                            <Loader
                              loading={isLoading}
                              className="d-flex align-items-center justify-content-center"
                            />
                          ) : (
                            ProductIcon && (
                              <span
                                style={{
                                  position: "absolute",
                                  top: "10px",
                                  right: "10px",
                                  cursor: "pointer",
                                  zIndex: 1000,
                                }}
                                onClick={cancelIcon}
                              >
                                <AiOutlineCloseCircle
                                  size={24}
                                  style={{ color: "red" }}
                                />
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </Dropzone>
                  {!newProductImg && (
                    <FormErrorMessage
                      error={errors.dropZoneField}
                      messages={{
                        required: "Product icon is Required",
                      }}
                    />
                  )}
                </div>
                {productType === "sovereign gold bonds" && (
                  <div className="col-6 mt-3">
                    <label className="Product_description">Product Image</label>
                    <Dropzone
                      onDrop={handleDropImage}
                      accept=".png, .jpeg, .jpg, "
                      maxSize={3072000}
                      errors={errors}
                      {...register("productImage", {
                        required:
                          newProductImage || productImage ? false : true,
                      })}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps({ className: "dropzone" })}>
                          <div className="   ">
                            <input {...getInputProps()} multiple={false} />
                            {productImage ? (
                              <>
                                <img
                                  src={productImage}
                                  alt="ProductIcon"
                                  className="preview_image"
                                ></img>
                              </>
                            ) : (
                              <>
                                <div className=" drag_btn ">
                                  <NormalButton
                                    onClick={(e) => e.preventDefault()}
                                    className="browse-button"
                                    label="Browse"
                                  />
                                </div>
                              </>
                            )}
                            {isLoad ? (
                              <Loader
                                loading={isLoad}
                                className="d-flex align-items-center justify-content-center"
                              />
                            ) : (
                              productImage && (
                                <span
                                  style={{
                                    position: "absolute",
                                    top: "10px",
                                    right: "10px",
                                    cursor: "pointer",
                                  }}
                                  onClick={cancelImg}
                                >
                                  <AiOutlineCloseCircle
                                    size={24}
                                    style={{ color: "red" }}
                                  />
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </Dropzone>
                    {!newProductImage && (
                      <FormErrorMessage
                        error={errors.productImage}
                        messages={{
                          required: "Product Image is Required",
                        }}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {productType === "sovereign gold bonds" && (
            <div className="benefit-area mb-4">
              <div className="d-flex justify-content-between mb-4">
                <p className="title_product">Benefits</p>
                <NormalButton
                  className="loginButton"
                  label={"Add Benefit"}
                  onClick={() => addBenefit()}
                />
              </div>
              <div className="">
                {benefits.map((item, index) => {
                  return (
                    <div className="row benefit-box mb-2" key={index}>
                      <div className="col-6">
                        <label className="Product_description">
                          {" "}
                          Benefit content
                        </label>
                        <InputBox
                          className="login_input"
                          type={"text"}
                          placeholder="Enter Product Name"
                          name={`benefits[${index}].name`}
                          errors={errors}
                          value={item?.name}
                          onChange={(e) => {
                            const updatedBenefits = [...benefits];
                            updatedBenefits[index].name = e.target.value;
                            setBenefits(updatedBenefits);
                          }}
                          register={register({
                            required: true,
                          })}
                        />
                        <FormErrorMessage
                          error={errors?.benefits?.[index]?.name}
                          messages={{
                            required: "Benefit content is Required",
                          }}
                        />
                      </div>
                      <div className="col-6">
                        <label className="Product_description">
                          Benefit Icon
                        </label>
                        <Dropzone
                          onDrop={handleDropBenefit(index)}
                          accept=".png, .jpeg, .jpg, "
                          maxSize={3072000}
                          errors={errors}
                          {...register(`benefits[${index}].benefitIcon`, {
                            required: benefits[index].benefitIcon
                              ? false
                              : true,
                          })}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps({ className: "dropzone" })}>
                              <div className="">
                                <input {...getInputProps()} multiple={false} />
                                {benefits[index].benefitIcon ? (
                                  <>
                                    <img
                                      src={benefits[index].benefitIcon}
                                      alt=""
                                      className="preview_image"
                                    />
                                  </>
                                ) : (
                                  <>
                                    <div className="drag_btn">
                                      <NormalButton
                                        onClick={(e) => e.preventDefault()}
                                        className="browse-button"
                                        label="Browse"
                                      />
                                    </div>
                                  </>
                                )}
                                {isLoadList[index] ? (
                                  <Loader
                                    loading={isLoadList[index]}
                                    className="d-flex align-items-center justify-content-center"
                                  />
                                ) : (
                                  benefits[index].benefitIcon && (
                                    <span
                                      style={{
                                        position: "absolute",
                                        top: "10px",
                                        right: "10px",
                                        cursor: "pointer",
                                        zIndex: 1000,
                                      }}
                                      onClick={cancelImg}
                                    >
                                      <AiOutlineCloseCircle
                                        size={24}
                                        style={{ color: "red" }}
                                      />
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                        </Dropzone>
                        {!benefits[index].benefitIcon && (
                          <FormErrorMessage
                            error={errors?.benefits?.[index]?.benefitIcon}
                            messages={{
                              required: "Benefit icon is Required",
                            }}
                          />
                        )}
                      </div>
                      <div className="d-flex justify-content-end">
                        <div
                          onClick={() => removeBenefit(index)}
                          className="remove-overlay cursor-pointer"
                        >
                          <img src={closeIcon} alt="Close" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {productType === "mutualFunds" || productType === "ipo" ? (
            <></>
          ) : (
            <>
              <div className="d-flex justify-content-end mt-5">
                <div className="col-2">
                  <NormalButton
                    className="loginButton"
                    label={"Add Details"}
                    onClick={() => setProductModal(true)}
                  />
                </div>
              </div>
              <div className="mt-2 mb-5 table-box">
                <Table
                  columns={columnData}
                  dataSource={tableData}
                  pagination={false}
                  scroll={{ x: true }}
                  className="w-100"
                />
                <div className="my-4">
                  <ReactPaginate
                    previousLabel={<FaCaretLeft />}
                    nextLabel={<FaCaretRight />}
                    pageCount={pageCount}
                    onPageChange={handlePageChange}
                    forcePage={currentPage - 1}
                    containerClassName={"pagination"}
                    previousClassName={"pagination-previous"}
                    nextClassName={"pagination-next"}
                    pageClassName={"pagination-item"}
                    breakClassName={"pagination-item"}
                    activeClassName={"active_page"}
                  />
                </div>
              </div>
            </>
          )}
          {console.log("errorsssssssssssssssssssss", errors)}
          <div className="d-flex justify-content-end mt-5 gap-3">
            <div className="col-2">
              <NormalButton
                onClick={() => history.push("/admin/product-management")}
                cancel
                label="Cancel"
              />{" "}
            </div>
            <div className="col-2 p-0">
              <NormalButton
                className="loginButton"
                label={edit ? "Update" : "Add Product"}
                onClick={handleSubmit(onsubmit)}
                isLoading={loading}
              />
            </div>
          </div>
          <div>
            <ProductPopup
              modalOpen={productModal}
              onCancel={() => {
                setProductData([]);
                setEditPopup(false);
                setProductModal(false);
              }}
              productType={productType}
              setEditPopup={setEditPopup}
              editPopup={editPopup}
              icon={icon}
              setIcon={setIcon}
              newIcon={newIcon}
              setNewIcon={setNewIcon}
              aboutUs={aboutUs}
              setAboutUs={setAboutUs}
              keyFeature={keyFeature}
              setKeyFeature={setKeyFeature}
              otherBenefit={otherBenefit}
              setOtherBenefit={setOtherBenefit}
              policyNotCover={policyNotCover}
              setPolicyNotCover={setPolicyNotCover}
              policyDoc={policyDoc}
              setPolicyDoc={setPolicyDoc}
              description={description}
              setDescription={setDescription}
              productData={productData}
              getDetails={getDetails}
            />
          </div>
          <div>
            <SuccessModal
              modalOpen={modal}
              onCancel={() => setModal(false)}
              successMsg={
                edit
                  ? "Product Details Updated Successfully"
                  : "New Product Added Successfully"
              }
            />
          </div>
          <DeleteModal
            modalOpen={modalVisible.show}
            closeModal={() => setModalVisible({ id: null, show: false })}
            handleDelete={handleDelete}
            DeleteMessage={"Are you sure you want to delete?"}
          />
        </div>
      </div>
    </>
  );
};

export default AddProductcomp;

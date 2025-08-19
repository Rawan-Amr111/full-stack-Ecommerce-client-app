import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Textarea,
  Flex,
  Select,
} from "@chakra-ui/react";
import { FiEdit2 } from "react-icons/fi";
import { Image, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { useDisclosure } from "@chakra-ui/react";
import DashboardProductTableSkeleton from "../components/DashboardProductsTableSkeleton";
import {
  useGetDashboardProductsQuery,
  useGetCategoriesQuery,
  useDeleteDashboardProductsMutation,
  useUpdateDashboardProductsMutation,
  useAddDashboardProductMutation,
} from "../app/services/apiSlice";
import CustomAlertDialog from "../shared/AlertDialog";
import CustomModal from "../shared/Modal";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectNetwork } from "../app/features/networkSlice";

const DashboardProductTable = () => {
  const { isOnline } = useSelector(selectNetwork);
  const [clickedProductId, setClickedProductId] = useState(null);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isOpenModal,
    onClose: onCloseModal,
    onOpen: onOpenModal,
  } = useDisclosure();
  const {
    isOpen: isOpenCreateModal,
    onClose: onCloseCreateModal,
    onOpen: onOpenCreateModal,
  } = useDisclosure();

  const [thumbnail, setThumbnail] = useState(null);
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
  });
  const [newThumbnail, setNewThumbnail] = useState(null);
  const { colorMode } = useColorMode();
  const { isLoading, data } = useGetDashboardProductsQuery({ page: 1 });
  const { data: categories } = useGetCategoriesQuery();
  const [productToBeUpdated, setProductToBeUpdated] = useState(null);
  const [destroyProduct, { isLoading: isDestroying, isSuccess }] =
    useDeleteDashboardProductsMutation();
  const [
    updateProduct,
    { isLoading: isUpdating, isSuccess: isUpdatingSuccess },
  ] = useUpdateDashboardProductsMutation();
  const [addProduct, { isLoading: isAdding }] =
    useAddDashboardProductMutation();

  useEffect(() => {
    if (isSuccess) {
      setClickedProductId(null);
      onClose();
    }
    if (isUpdatingSuccess) {
      onCloseModal();
      setClickedProductId(null);
    }
  }, [isSuccess, onClose, isUpdatingSuccess, onCloseModal]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (productToBeUpdated) {
      setProductToBeUpdated((prev) => ({
        ...prev,
        attributes: {
          ...prev.attributes,
          [name]: value,
        },
      }));
    } else {
      setNewProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const onChangePriceHandler = (value) => {
    if (productToBeUpdated) {
      setProductToBeUpdated((prev) => ({
        ...prev,
        attributes: {
          ...prev.attributes,
          price: +value,
        },
      }));
    } else {
      setNewProduct((prev) => ({
        ...prev,
        price: +value,
      }));
    }
  };

  const onChangeStockHandler = (value) => {
    if (productToBeUpdated) {
      setProductToBeUpdated((prev) => ({
        ...prev,
        attributes: {
          ...prev.attributes,
          stock: +value,
        },
      }));
    } else {
      setNewProduct((prev) => ({
        ...prev,
        stock: +value,
      }));
    }
  };

  const onChangeThumbnailHandler = (e) => {
    if (productToBeUpdated) {
      setThumbnail(e.target.files[0]);
    } else {
      setNewThumbnail(e.target.files[0]);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append(
      "data",
      JSON.stringify({
        title: productToBeUpdated?.attributes?.title,
        description: productToBeUpdated?.attributes?.description,
        price: productToBeUpdated?.attributes?.price,
        stock: productToBeUpdated?.attributes?.stock,
        category: productToBeUpdated?.attributes?.category,
      })
    );
    if (thumbnail) {
      formData.append("files.thumbnail", thumbnail);
    }
    updateProduct({ id: clickedProductId, body: formData });
  };

  const onSubmitCreateHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append(
      "data",
      JSON.stringify({
        title: newProduct.title,
        description: newProduct.description,
        price: newProduct.price,
        stock: newProduct.stock,
        category: newProduct.category,
      })
    );

    if (newThumbnail) {
      formData.append("files.thumbnail", newThumbnail);
    }

    addProduct(formData).then(() => {
      onCloseCreateModal();
    });
  };

  if (isLoading || !isOnline) return <DashboardProductTableSkeleton />;

  return (
    <>
      <Flex direction="column" maxW="85%" mx="auto">
        <Button
          bg="#352c0f"
          color="white"
          ml="auto"
          w="fit-content"
          onClick={() => {
            setNewProduct({
              title: "",
              description: "",
              price: 0,
              stock: 0,
              category: "",
            });
            setNewThumbnail(null);
            onOpenCreateModal();
          }}
          _hover={{ bg: "#463c1bff" }}
        >
          Create Product
        </Button>
        <TableContainer p={3} my={6}>
          <Table>
            <Thead bg={colorMode === "light" ? "#c8cfd5ff" : "#2f2f2f"}>
              <Tr>
                <Th>id</Th>
                <Th>title</Th>
                <Th>category</Th>
                <Th>thumbnail</Th>
                <Th>price</Th>
                <Th>stock</Th>
                <Th>actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.data.map((product, index) => (
                <Tr
                  key={product.id}
                  bg={
                    colorMode === "light"
                      ? index % 2 === 0
                        ? "white"
                        : "#bcb48aff"
                      : index % 2 === 0
                      ? "#352c10"
                      : "#1e1e1e"
                  }
                >
                  <Td>{product?.id}</Td>
                  <Td>{product?.attributes?.title}</Td>
                  <Td>
                    {product?.attributes?.category?.data?.attributes?.title}
                  </Td>
                  <Td>
                    <Image
                      borderRadius="full"
                      objectFit="cover"
                      boxSize="40px"
                      src={
                        product?.attributes?.thumbnail?.data?.attributes
                          ?.formats?.thumbnail?.url
                      }
                      alt=""
                    />
                  </Td>
                  <Td isNumeric>${product?.attributes?.price}</Td>
                  <Td isNumeric>{product?.attributes?.stock}</Td>
                  <Td>
                    <Button
                      as={Link}
                      to={`/products/${product?.id}`}
                      bg={colorMode === "light" ? "#fae3b9" : "#2f2f2f"}
                      variant="solid"
                      mr="3"
                    >
                      <AiOutlineEye size="17" />
                    </Button>
                    <Button
                      bg={colorMode === "light" ? "#e35053" : "#2c0707ff"}
                      variant="solid"
                      mr="3"
                      onClick={() => {
                        onOpen();
                        setClickedProductId(product?.id);
                      }}
                    >
                      <BsTrash size="17" />
                    </Button>
                    <Button
                      bg={"gray.400"}
                      variant="solid"
                      onClick={() => {
                        setClickedProductId(product?.id);
                        onOpenModal();
                        setProductToBeUpdated(product);
                      }}
                    >
                      <FiEdit2 size="17" />
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>

      <CustomAlertDialog
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        title={""}
        description={"Do you want to delete this product?"}
        okTxt={"Delete"}
        cancelText={"Cancel"}
        onOkHandler={() => destroyProduct(clickedProductId)}
        isLoading={isDestroying}
      />
      <CustomModal
        isOpen={isOpenModal}
        onOpen={onOpenModal}
        onClose={onCloseModal}
        title={"Update Product"}
        cancelTxt={"Cancel"}
        okTxt={"Update"}
        onOkClick={onSubmitHandler}
        isLoading={isUpdating}
      >
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            placeholder="Product Title"
            value={productToBeUpdated?.attributes?.title}
            onChange={onChangeHandler}
            name="title"
            my="3"
          />
        </FormControl>
        <FormControl mb="3">
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Product Description"
            value={productToBeUpdated?.attributes?.description}
            onChange={onChangeHandler}
            name="description"
          />
        </FormControl>
        <FormControl mb="3">
          <FormLabel>Category</FormLabel>
          <Select
            name="category"
            value={productToBeUpdated?.attributes?.category}
            onChange={onChangeHandler}
          >
            <option value="">Select Category</option>
            {categories?.data.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.attributes.title}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl mb="3">
          <FormLabel>Price</FormLabel>
          <NumberInput
            defaultValue={productToBeUpdated?.attributes?.price}
            precision={2}
            step={0.2}
            name="price"
            onChange={onChangePriceHandler}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel>Count in stock</FormLabel>
          <NumberInput
            defaultValue={productToBeUpdated?.attributes?.stock}
            name="stock"
            onChange={onChangeStockHandler}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel>Thumbnail</FormLabel>
          <Input
            type="file"
            h="full"
            p="2"
            accept="image/png, image/jpeg, image/gif"
            onChange={onChangeThumbnailHandler}
          />
        </FormControl>
      </CustomModal>
      <CustomModal
        isOpen={isOpenCreateModal}
        onOpen={onOpenCreateModal}
        onClose={onCloseCreateModal}
        title={"Create Product"}
        cancelTxt={"Cancel"}
        okTxt={"Create"}
        onOkClick={onSubmitCreateHandler}
        isLoading={isAdding}
      >
        <FormControl mb="3">
          <FormLabel>Title</FormLabel>
          <Input
            placeholder="Product Title"
            value={newProduct.title}
            onChange={onChangeHandler}
            name="title"
          />
        </FormControl>
        <FormControl mb="3">
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Product Description"
            value={newProduct.description}
            onChange={onChangeHandler}
            name="description"
          />
        </FormControl>
        <FormControl mb="3">
          <FormLabel>Category</FormLabel>
          <Select
            name="category"
            value={newProduct.category}
            onChange={onChangeHandler}
          >
            <option value="">Select Category</option>
            {categories?.data.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.attributes.title}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl mb="3">
          <FormLabel>Price</FormLabel>
          <NumberInput
            value={newProduct.price}
            precision={2}
            step={0.2}
            onChange={onChangePriceHandler}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl mb="3">
          <FormLabel>Stock</FormLabel>
          <NumberInput value={newProduct.stock} onChange={onChangeStockHandler}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel>Thumbnail</FormLabel>
          <Input
            type="file"
            h="full"
            p="2"
            accept="image/png, image/jpeg, image/gif"
            onChange={onChangeThumbnailHandler}
          />
        </FormControl>
      </CustomModal>
    </>
  );
};

export default DashboardProductTable;

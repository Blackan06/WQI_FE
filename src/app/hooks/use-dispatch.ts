import { AppDispatch } from "../store";
import { useDispatch as _useDispatch } from "react-redux";

const useDispatch = (): AppDispatch => _useDispatch();

export default useDispatch;

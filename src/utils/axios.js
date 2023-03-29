import axios from "axios";
import { BASE_URL } from "@/utils/constants";

axios.defaults.baseURL = BASE_URL;
axios.defaults.timeOut = 20;

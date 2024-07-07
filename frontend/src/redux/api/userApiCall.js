
const [data, setData] = useState(null);


// admin api call 
export const getAllUser = async (_, { rejectWithValue }) => {
    try {
        const data  = await getUsers()
        console.log(data);

    } catch (error) {
        return rejectWithValue(error.response.data || error.message)
    }
}
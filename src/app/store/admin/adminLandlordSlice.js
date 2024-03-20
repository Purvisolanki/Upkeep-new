import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getadminLandlords = createAsyncThunk(
  "adminLandlords/getadminLandlords",
  async (token) => {
    console.log(token)
    const response = await fetch("https://reileadsapi.exerboost.in/upkeep/app/admin/fetch-landlord", {
      headers: {
        Authorization: ` ${token}` // Include the token in the Authorization header
      }
    });
    const data = await response.json();
    return data.result;
  }
);


export const deleteProperty = createAsyncThunk(
  "adminLandlords/deleteProperty",
  async ({ token, propertyId }) => {
    const response = await fetch(`https://reileadsapi.exerboost.in/upkeep/app/landlord/delete/property/${propertyId}`, {
      method: 'DELETE',
      headers: {
        Authorization: ` ${token}`
      }
    });
    const data = await response.json();
    return data; // You can handle the response as needed
  }
);


export const createProperty = createAsyncThunk(
  "adminLandlords/createProperty",
  async ({ token, propertyData }) => {
    // console.log(propertyData)

    const formData = new FormData();

    // Append form data fields to the FormData object
    Object.keys(propertyData).forEach(key => {
      formData.append(key, propertyData[key]);
    });

    const response = await fetch("https://reileadsapi.exerboost.in/upkeep/app/landlord/create/property", {
      method: 'POST',
      headers: {
        Authorization: ` ${token}`
      },
      body: formData
    });
    const data = await response.json();
    return data; // You can handle the response as needed
  }
);
//update
export const updateProperty = createAsyncThunk(
  "adminLandlords/updateProperty",
  async ({ token, editData, updatepropertyId}) => {
    // console.log(propertyData)

    const formData = new FormData();

    // Append form data fields to the FormData object
    Object.keys(editData).forEach(key => {
      formData.append(key, editData[key]);
    });
    const response = await fetch(`https://reileadsapi.exerboost.in/upkeep/app/landlord/update/property/${updatepropertyId}`, {
      method: 'PATCH',
      headers: {
        Authorization: ` ${token}`
      },
      body: formData
    });
    const data = await response.json();
    return data; // You can handle the response as needed
    //comment
  }
);

const propertySlice = createSlice({
  name: "property",
  initialState: {
    adminLandlords: [],
    loading: false, 
  },
  extraReducers: {
    [getadminLandlords.pending]: (state) => {
      state.loading = true;
    },
    [getadminLandlords.fulfilled]: (state, action) => {
      state.loading = false;
      state.adminLandlords = action.payload;
    },
    [getadminLandlords.rejected]: (state) => {
      state.loading = false;
    },
    [deleteProperty.pending]: (state) => {
      state.loading = true;
    },
    [deleteProperty.fulfilled]: (state, action) => {
      state.loading = false;
      // Remove the deleted property from the state
    },
    [deleteProperty.rejected]: (state) => {
      state.loading = false;
    },

    [createProperty.pending]: (state) => {
      state.loading = true;
    },
    [createProperty.fulfilled]: (state, action) => {
      state.loading = false;
      // You can handle the response if needed
    },
    [createProperty.rejected]: (state) => {
      state.loading = false;
      // Handle the rejection if needed
    },
    [updateProperty.pending]: (state) => {
      state.loading = true;
    },
    [updateProperty.fulfilled]: (state, action) => {
      state.loading = false;
      // You can handle the response if needed
    },
    [updateProperty.rejected]: (state) => {
      state.loading = false;
      // Handle the rejection if needed
    },
  },
});

export default propertySlice.reducer;

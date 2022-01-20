import {
  Box,
  Grid,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { constructTx, signTxAndBroadcast, suggestNetwork } from "./StakeHelper";
import { mainnetConfig, testnetConfig } from "./config";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    padding: "2em",
    marginTop: "4em",
  },
  textfield: {
    color: "white",
  },
}));

function App() {
  const classes = useStyles();

  const [stakeAmount, setStakeAmount] = useState("");
  const [delegatorAddr, setDelegatorAddr] = useState("");
  const [validatorAddr, setValidatorAddr] = useState("");
  const [network, setNetwork] = useState("Mainnet");

  const [validators, setValidators] = useState([]); // {address: cheqdvaloper..., moniker: name}

  useEffect(async () => {
    window.onload = async () => {
      //await window.keplr.enable(testnetConfig.CHAIN_ID);
      await window.keplr.enable(mainnetConfig.CHAIN_ID);

      const offlineSigner = window.keplr.getOfflineSigner(
        mainnetConfig.CHAIN_ID
      );
      const accounts = await offlineSigner.getAccounts();

      if (accounts[0]) {
        console.log(accounts);
        setDelegatorAddr(accounts[0].address);
      }
    };
  }, []);

  useEffect(() => {
    const API_URL =
      network == "Testnet" ? testnetConfig.REST_URL : mainnetConfig.REST_URL;

    axios.get(API_URL + "/staking/validators").then((res) => {
      console.log(res.data.result);
      let _validators = [];
      res.data.result.forEach((_validator) => {
        _validators.push({
          address: _validator.operator_address,
          moniker: _validator.description.moniker,
        });
      });
      setValidators(_validators);
    });
  }, [network]);

  const stakeClick = () => {
    const tx = constructTx(delegatorAddr, validatorAddr, stakeAmount, network);
    signTxAndBroadcast(tx, delegatorAddr, network, () => {});
  };

  const connectClick = async () => {
    await suggestNetwork(network);
    const CHAIN_ID =
      network == "Testnet" ? testnetConfig.CHAIN_ID : mainnetConfig.CHAIN_ID;
    await window.keplr.enable(CHAIN_ID);

    const offlineSigner = window.keplr.getOfflineSigner(CHAIN_ID);
    const accounts = await offlineSigner.getAccounts();

    if (accounts[0]) {
      console.log(accounts);
      setDelegatorAddr(accounts[0].address);
    }
  };

  return (
    <div className="App">
      {/* <Box display="flex" justifyContent="center" alignItems="center" className={classes.root}> */}
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h4" margin={"1em"} textAlign={"center"}>
              Keplr Staking
            </Typography>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box display="flex" flexDirection="row" style={{ margin: "1em" }}>
                <Select
                  value={network}
                  onChange={(e) => {
                    setNetwork(e.target.value);
                  }}
                >
                  <MenuItem value="Testnet">Testnet</MenuItem>
                  <MenuItem value="Mainnet">Mainnet</MenuItem>
                </Select>
                <Button
                  variant="contained"
                  fullWidth
                  style={{ marginLeft: "1em", marginBlock: "0.5em" }}
                  onClick={connectClick}
                >
                  Connect/Add
                </Button>
              </Box>
              <OutlinedInput
                fullWidth
                placeholder="Stake amount (CHEQ)..."
                onChange={(e) => setStakeAmount(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">CHEQ</InputAdornment>
                }
              ></OutlinedInput>
              <TextField
                fullWidth
                value={delegatorAddr}
                placeholder="Your Keplr address (cheqd1wt...)"
                onChange={(e) => setDelegatorAddr(e.target.value)}
              ></TextField>
              <TextField
                fullWidth
                value={validatorAddr}
                placeholder="Validator address (cheqdvaloper1d...)"
                onChange={(e) => setValidatorAddr(e.target.value)}
              ></TextField>
              <Button
                variant="contained"
                fullWidth
                style={{ marginTop: "2em" }}
                onClick={stakeClick}
              >
                Stake
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h4" textAlign={"center"}>
              {network} Validators
            </Typography>
            {validators.map((validator) => (
              <Paper
                elevation={6}
                style={{ marginTop: "0.5em", padding: "1em" }}
                key={validator.address}
              >
                <Box display="flex" flexDirection="row" alignItems="center">
                  <Button
                    style={{ marginRight: "2em" }}
                    onClick={() => {
                      setValidatorAddr(validator.address);
                    }}
                  >
                    Select
                  </Button>
                  <Typography variant="h5">{validator.moniker}</Typography>
                  <Typography style={{ margin: "1em" }}>
                    {validator.address}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Paper>
        </Grid>
      </Grid>

      {/* </Box> */}
    </div>
  );
}

export default App;

export default function verifyToken(token) {
const verifyToken=localStorage.getItem('_xt_cfg_9x2kgd$25gT56') ? localStorage.getItem('_xt_cfg_9x2kgd$25gT56') : null


if (!token|| !verifyToken) {
return false;
}
return token === verifyToken?true:false;

}
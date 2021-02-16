/**
    Grammar is descriptions about tokens
    @return patterns for search tokens and making tokens stream
 */

const Grammar = {    
            tokens : {                
                patterns: {
                    "javascript": /[j|J](ava|)[s|S](cript|)/g,
                    "java" : /[j|J](ava|AVA)(\s)/g,
                    "c++" : /[c|C](\++|\+|plus)/g,
                    "python" : /[p|P](i|y|I|Y)(ton|thon|TON|THON)/g,
                    "php" : /[p|P](h|H)(P|p)/g,
                    "swift" : /[s|S](wift|WIFT)/g,
                    "android" : /[a|A](ndroid|droid|NDROID|ndroid|nroid|NROID)/g,
                    "ios" : /[i|I](OS|os|0s)/g,
                    "bash" : /[b|B](ash|ASH)/g,
                    "text" : /[a-zA-Z0-9_\-\+\.\:\,\!]+[\w\-\+\.\:\,\!]/g                
                }
            }   
        }

export default Grammar;
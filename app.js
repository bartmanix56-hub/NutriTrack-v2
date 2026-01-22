



<!DOCTYPE html>
<html lang="fr" style="overflow: hidden;">
<head>
    <meta charset="UTF-8">
    <!-- PWA Meta Tags pour iOS -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="NutriTrack">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="theme-color" content="#1a1f2e">

    <!-- Apple Touch Icons -->
    <link rel="apple-touch-icon" href="apple-touch-icon.png">
    <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon-180x180.png">
    <link rel="apple-touch-icon" sizes="152x152" href="apple-touch-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="120x120" href="apple-touch-icon-120x120.png">

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="data:image/png;base64,UklGRsQyAABXRUJQVlA4WAoAAAAgAAAA/wMA/wMASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDgg1jAAALCsAZ0BKgAEAAQ+USiTRqOioiEhtig4cAoJaW78fJigY7lzv3v/6QGOPS//v+PUcb+ss/z/dEOf/59Dff1S6Z3mT//49o+W/4H5XbSR37/Hfrv/e/3G6zbiXub/Rf2h6dVIfqt7W/n/6/+U/bw8wP+Dfxj/R/17/J/s53hvMF+uH7Re8N/iP2A90H+E/tP/F/ufwAf1H+6f/fsHv2x9gP9ef+/64X7a/CJ+0P7V/A7+w//79gD//+oB//+vf6vf4P+q/3LvG/wX9o/Hv3j4zHMRiL/Hfup/B/tXn93n/LjUC/F/5n/pN5PAB9fvPe+t80/tL/vvcC4DD1D2Av51/fPRI+ufQ39X+wv+w/W8UBE8GiXftg8wqVzhol37YPMKlc4aJd+2DzCpWQlD+DyR/oy1ZCqJ2t37Ttu/bB5hUrnDRLv2weYVF3GggOw/YPMKf84VFd9Wb3HlsxpxEb0n1DGYTQGxhUrm+JXEXJmvPH2weYVK5w0S4pq+kFSucNEu/a5aFXOGiXftg8QCK0RyO79sHmFSucMJtEDu9HB5hNAghoR1G2Oofyvd+2DzCpXOGiXftgw8fcMKlc4aJRx9cYBeER6YAVK5w0S79sEkFP+R9kMtyVzhol37YPMKlc4aIOnDRLv2weYVK5w0Ru9Reiqzy8PMuugFyYO4rdKwSHhfkd37YNQCwduaVLVyh5yUHzktXKJEPdRolBCmovZ4s8vF7Jwdzhokt0gg2s+R3ftg6me0fnJaucNEu/avgxZ5eL2eLPLxfvoAIjeNQ9YcNEu/bB5hUrcFny49eYVK5w0S79qzxdli/bGHZUeyxftpdjDvZKHZc9ew3YPMKlc0qWrm+pFczCo7D0Y6+cXZYv2xVcQXzrh2t9ltMMv6fQVZ6DNtYVpySWuXsL+E9wxgIrWfI7v2weVXaPzktXKk1smr7COqXcsYE7ssn5sjMrsIc5MLX8Yv9+4yN/pwZswfqW09F5qsQYaevqYnqVVklglZmdIvju+1QLzhol3U86qDmE9YcNCZJS3u/BtLF8ACb//iTK//dxYuKCYxZWBms8Xj6G6hGmocqbWiB0lAJ4UR2bPEWlB0LYBnyOzsg4/3KnmFSucNDi9If0ITj343v/3SuVDS25cCr+wC/Bez6dYF0N9atKus8rCRHhcnrG8/6gg2s+R0XmEAVWRt2DzCpXI+B+2MEFmy27dD5wLBYCV+F8Cr+wC/BezxrMP/JLBHLBL+d2I8a/2yLm6UPGxK5w0S7qqqD0MB7B5ehBHsqIVqjgFDCtTAOvxZliPYmAL8F7PFZ53Sacv/7+wCxo9n+/bB5hUrcMKlc4aH5CYdgPwfA0ObtZLJpRjXgVf2AX4L2eK167zovHqjrZa8z6j4pqZj2j85KoXl60DV2jbAlZAPwfA0Obs96tXBc5sR7EwBfgvZ4rVthHKvba3E0/stpol37YPKrtH5yVG0sXhMzWgIc3YCVL9sYdlJpKylM1y+guc/NzGDYn6pl/5Sj+2lJaucNEHSf8hX5P/d+UqyxJOtOUWby6MYdlR7LF7gVf2AX4L2eK1cHDKRbHrv0mVAH7tKuSSvzCpXL8qUuWTRzhoa2yoinOCo/Nu1B4zizvhiysDNZ4s8vD7Z5UcayRka+nBeCr8CHSNGVBnXtGX7B5ffQB0OwQe4hm2a3xCweyaUY14FX9gF+C9nitXBc5ptNWDoavtivw92Dy+RHt8U9afI7Rj9rgBciamqeDh+UoFAGAaX5c/WFv00Nx114ZOCyLn06qHRy7tz5ezw0eguPe+q+/wSBU9r7aCDZbQQXHUZURazsW5WtWcUM3mVA//8f5vf/sKuKSMjPoboxkL9A07u61kCQfQXHYxjmvbhYO4NrPip+s4AZZgDKiN43TGeeyxftjDsbnJW71CcYgXFHstNKAPlUQzm8AoZvp+9NlwXPAoCY5YhZZCyo/x/0I8vOoPX52AiDZWZoK3PnZohKpqJHt/KueDGcytb8cUofQXPIH43OQI4zzNzfM+TWEEw0+Ns+P8eH7EHWNgwusxIFR+WY8G5MjmnoLhq+p6JK72VMw9sv2xh2VHsscane3W2aopQKDIDc5AyqtrvfsHUxan03yjFcDsmfr2TnfOwQe4hm2a4pFCKUZBc8CacPzVSEBZ5ih9BcfJSNHYGMXZ/Uc/ZW3TZZ8ahx87WHLT5N83OCQSpPtPv+WEFKMgrnxQzXmBwKDIK8vZifa7yY30Gzo5GbF0+B+1bM91YQCs0fIPcUfV8UeyxftjDsqPZXZNudMKtUDhnN+u9ycM5v13uThnN+sRDzV5TEk31bc/8WT9q/C8ZF0Mgr5x4Tk6gZk1v0+tHoLniBQZUx2GWiu5CKQWECJZgkqgLng9LBI9h9bsC9k53zlPJkYeyRz08y8Xs8WeXi9nizNqNNI+YkE/H5yrDFO9H9PrdyT6fJX0vMeAjsDwo9y8Xs8WeXi9nizy63ET5ktPLnZMEPs5xWuWXD8ipbKcwB6nvHmXi9nisY2J5/M+Z8z5nzPmfM+Z8z5nzD1VkgVu0I+t7xs0k6ksvJGb8MnHhOk87vK9digUGQXPDu8XLrivFnl4t0eSSAU009L/2tsv0O7ZM3Cz6rrBoCgGHG2xqR54Ue5eL2eLMpNUNah8vF7PC5TXxxHMDbNPOw7j6hWSdSR+jnMvZOd85RPoPSaU/D2lAoMgueBNcEcsGn4LF7PFY0CMd3IqiXdN+0+EGJRngG75abaCvnHl6a3iDlv5cH0FzxAlySr0h+eLPFnl1jpkz/9DHGEEDu3/UB2Ven6VTzZBSBYPmpDJ1EuCO0n1o9Bc8QJfeSPFMUwnE8y8XslOIMm1QHkCVTyq7R9SbjRA+mIPCAfih81JdZ14NRmsdfizy8OwAt8qD/HchkFzxAMYgbBeC3qj2pBVYvyOWgCYdghnAufT8dD0g+gNVvzXHCY5BR7l4vZMAElt+uKP1Q9R7LF+2KgC5CtXdMDuDazrpNecj9OI+GjBccaZOZtQgUcptRbhVbbgGSEE5yyp3uXi9G8DFza1wN244cXF7PFmRGYFVjxSA/AhUdf51lyqkPuB+2MBhMyojKJHuXi9ElYqSVHOYykDvS+usGalX5qdv8Lpbpc3ssX7Yw7KiN6rpPeiPk2M+R2pBVN5QxlRUZJ6Vktj2WL9sYdnK4R96meSRwdfU4NopJNH4kBMedMJYeCeuUdeS9J9/ywgpRjWibkC2DnFDSol5hUnrOSFuZ7xkOzeCjjl62R/4UJCeZeL2eLxrtEehuXUXe2eXi9IR6qEzuB9LLjuSrbv2wFWPZ/AeE5KYeEizH9DB01OH6msIKUY2Zg+K1UmlGQXHGO20PxklUnKDPkd3LXF9S79mVQZRbboWUgbRuzqE76eZeL2eGMwfFaqTSjIK6A/loUdhd9xXKtmPWTCb/uucaOb1owrjs6ZOR8WR1htzzSjILniBMFM1yzbLgueBKiQbm9DIwsQwgqtmPY3hs4WGvkW07xli/ah50bVtIC2EHssX7Yw7KjoC/A+tHoLj1gYurywNokovZjhxLZj2j8zU8bbKo2N6Tq1gIQo+VlE/BoxeyvgvZ4s8qlM1yzbLguPWBi6vLA7U1E7dLd+2DzClwkc+ZMV2Sh2SyOeAkcAKRSBNEDbl4vZ4szOZrlm2XBXPw6ityhaaVPfLIjs0S79rxRW82ypRsiaTpwGOv0pdaIqPhoTkXqIeL4Qmdw+gueHgpmuWbZbaBc9rg7M2YSVP7KzqfI7v2Vm/v6gwiN00beOp2t3yeNodpY3os7mC6PblTfcP9Bc8PBTNcs2ymvbw5M8mjVsSiGJ5ECpXOGiXfsiCikCwQ0S79hcMgFKMnfZ0dTQN/Q20Tqi1D6msGeAX4HoKN/wC2ZHb05AmfKPT2+Wg/OS1c4YibLKDBoR+clq5w0FZm0sX72482T1/QVRi/qRK9ZnpWOjwOswem7iDHuHwmVG01E2/721KEgW/3pAqtmPaPzktW4YVK5w0SWgOIiBED9sbazH4zzkLcmzZOA5YxOA10SR90+WHOQNldzQjEA7YL+baSanFtkGLPLz6bB5hUrnDRLuqqtmPaPzktXOF9NlEf2xh2Vg+gugCLPFnpV37YPMKlc4aJd1VVsx7R7qh8eWYVK5wvddC9nizy8Xs8WeVgwqVzhol37YPMKlbhhUrki1CoVwjdKvIlCjXMUKlcoVBu6BmBn2HZ4s8vF7Oq5knaPzktXOGiXftg8qu0fnJaucNEu/bB5hUrnDKRezxbuRt3tg8wqVzhol37H+y8c33GTrB5P47v2weYVK5w0S79sHluSucNEu/bBJBUrnDRLvqZ6Avl9/Wm1u/N4l10njpWs+R0DCww8FbjYeNgqtmPaPvcN3OGiXftg8wqVzhol37YPMKlc0qPAghol37YPMKlX39tFkuqy6yTs2psqrnDRLimweYVK5w0S79sHmFSuaVDdzhol1u3EfHOGiXftg8wp/zhol37YJCyC8gNEo5w4gDhol37YPMKjq7Ivs0qvLTBhJyWq8L5ZqY9o/OS1c4aF5gIKiq2Y9o/OQx84aJd+2DzCpXOGiXXPW0AAD++YiNXbknlF0ZpYoau4l3R1f+ejrTeRZkNa9G5oe6XmpHkWSfFIKQK45ZZq4EpmUH5i9Rw5GtnA6c1LHp0F5XOuk4Wv9bK5wJQWaEF1ucEJwJPsdKmqk3vA9nx6/dwS9m4ttqrnNxbbWd2Q+5X6Gz1sr8xw+VzAkMt5byfzUKV+hu60E3vCQpwIYeqxqTut5L4D1l+Bs2GwAlUZPkNKSQLc23XJJukNQSn4SP06gevRC/i18t6y5Tn7NQkVf8/k0ov2iwbuTqZ2EqKJ1Vq4jl5CPLAAbnpqVMx5LdVNZlX2OweGESs+zlqgU6M2cwY71FHCBBsfpzUTqWGykpkBHpNeent6rV0qwaYWmOKyf+TIpYTs5hScApdIM+Y0gN2+F2nEPBDWkeO8c7dz/BH/xOrgSUFUjoHZaFdPpHvuTBn/4F7CUAJyo7WT3DB6CCrx1ftMpomo5FhfgiIztw3N5GNt8hEYv6WdPakYLirtIZ3EwUCgkVlOhDhmap4RDfolZxzIDb8LR8K+XzGBePu6eRcnIhIco6jcOwuuIc1hZwZ3tbvwCQ7D4vq8Vc9QAUnzz0sd8zSQoNxc4QDiSN3R02eXbMhS5Y1SvnuNuWbibbQ0U0pM/sHaTDXAReoyTJ4pTy7oAAFRvO44QZxo7CqpIelSUODkrttJrOBgGNG5GOzYGKTGCUgB8nK5TdZ38cD5QAAWoYuQl5c1KBCgwTDE5dX33wcsgRk7SAmzbQel+ILZRoK+K8AAACyLAJzqwSx08BzVvwty3MlJ1WE8V2wwHPwgiQsMqTMv0aTsbZSI0RTkr0HgeguuydPfc8h0M2ulv74pTEzoib/7e/H/jX5Ai31NOT5hYMtsr+/0xLLNG3SX0dA8bOZjwEs0mkY/mISGmzvGNTzRai7A//fd5xRcleMBGgCyj75gBcaYEOmk8wLqwF2wWxT/T+s1yMnn0Uqz990sD9xlLdKlWecZvJOLAuhjP2P7LulY6oTKx9Fx9wvplKLMXzmdYoH64wPCCX3cUXsobKV0cOqVAmrhtbP6yLui4/k1YEwq+ma6TbS46rUWBfxWInUwMuQNSrRPQPnkGohWboce8AdI56iZzOgt4FBYKm27zj7jLpVcLC4b7ogPNeJo9XbZA0rz5xkJcX6sg3lhSxXvjotV8+gk55QFELqr1I3ECIllN5lXIhha8H/3ho9laqlxdnXLad1jlgEnztZrH/13mtXify0UzjH+QEflOjauB/wAccVF8HGEQGxj/uPxmmzlOfev8NiIRRXUP2rO8Q+81wehPuFeXb5Ez97WPWhHr2MhOn2DyckTXBwu30SGd4U568yRYneTh6yLynCRf/K9+RvoOOWAmn3qm7vX6n8PeFhCO8vmn2uk4h+VI6lwtDFEItS/HVgRDfEm9D5LUs/VEmDH6yibqNZpHY8uJthAkMFE29IWYTOc8RKOYMz3RgmTBXP3aTQ0W6yUDC7JLLLCc9+xCNXsh38MAjBYz/Xn/ERkWI1F3cOsW0NaZeG/+8NM+roHEkEeA4s29B2dChbuyvmQ7M3dvOvySCNXgmoHWXyM7mVVmjCQlUWUb7NcQ04Nu1Z+txiITgs51p8p/jjNiNp+yqmefhE0kMlZzyCFajPDG0wJCel9lORDQizBEbBcMXrXd63xjhdTp+dqwAuhRUIWCj+GjN+9FO8H9PIg8Z9um3rr+lcfcnExs/IarW+YxM5zLd3vYvXMZZZdLJF1dt7+6da7v+tEardzPeH6PHv/9+q32cy4o8Uqd58axo+8gnpnN+/JRLJDuJdqqPkGwMpjsZ+gjis5wt9xnSf/4ewEPEZd1GXGmjECiXsOHz6k9k896oCnNtl5FcvVjUt8OVeZIFdJetkRtxFtnVnMhRPTxpw7bYuydUE7Ihbh9703zUbg1nO6lY0FlBWLbu3j0mlCSHpTUGxrcT9RU1wz6BSxPrkiGJMVFAkfirIk+vv443qTsxkbAFz4DcOzUNX2fdfbmuuw7olcYu/vJmg3bwRuH/uWImoUQNNL19afLMrbzvEIpaT1wOKnjb5EpPtH+ogBC75K9q2AIzYLZAxhKaYW0SUByu+n1c54WOTXxtmVbPejCyXHNvo6v7DBd29QM+bZzc/5MqySzobx9pvvfo+IUQXmgYVBnItRDLds2knCHb/XV0OK27en6kXO07cgOm39s/ssFMmm9kbj3+Oadz4V25/ekTZw+gTz8blW0EHA8+30jGUSj/+KQRIG3mbemx4RsuLIwbEWb5KdwAnNgk8OsXozZ4GiDFcOQKVjDRLIM6A28LqHK3ltP1uLKjidZK/GAnZ3sYFoT2mvcxZ5T3uw9FXICq4HsjUKWE9qC/+KCvLsBtXCtbsDE6uQkw8RZWU3ZUM2fjbz+rRg+OTh/v1DW8Ap1hZ75ockGpNorntfHaDaBKuC59flWDrimoA4ZsAmtgxDiUsgiJUkDL1C/kIlWQjpOjiniX5Tfs3seoA4EIajE/wdFOdMwJpqsZLDK860xmGD4Xqjn17uLgMT8s5x/8JaZQ/Qh9Z/kng+VGuVLvPMEK7IErweHAaLVAWmeymZwPrUcfYFQfljeOxb8z89B4P1UY0Z9O5sIxn+xn4t4uu1EUjQ34igZaMQvuWzojpH0dm+niJ6rUdgFqCkB2GR8xzxNwhHzkv2eCwRz+NMwVn2KMypqbJPJ4/MUbGm9wunTr78K8FubWTMMInCxVXA1Ryqe6YL7bg9JbfwogelE51rYyE0lLSBuZaQ+ldk6C6CjjS40yN5cJ80XH0YjTdauu9X33318G+TWN5pBcgCrRiSWJ6wC+CCOqBKzLqkvywwMYvqavuPCiaOGKoNiffdVB7yiMiBmxzUUvEagq1ncTzfo8VR/GIrNVlU90wX7WHK33k4NtO5ldryWUxc/nug3iWgxidGdyO7uDivnYDIBK3y3E0RjgPYM/zXvlv/fbcAdyMLyhtLsnCGVYiuFd9RFs5MAB1bhDLCCvZmRX2cPnmRdvoxT3e6wSA2xxCiMxDDzLRz4mHS9eP/zg5s8Zp9d7wyEkQnOl+hrwhDbf3GhBNHsiRrZgMhBdjHNJBrTaOft8ts+1eVFcydSHubOG0gWuQf+rBT8L0JgCa2B3ZbxFKBBfzjVLue5xvu3pFQkD+fgXvzuWGo4XEqHE87pSxtUh8wg3HOYV9/m2tY+0PM9elsnovynA2sCtjC7z4dx4ZIbxEE1i/jrKUEHYOIyyH8D1sfFDEv4ngILk9SuhK52xrzJnTx7/Nc6JOv8DT/a5yG54xzQ40YISaG2DHBAGaIyEFRlKdDdnNPWFRTIi0eytZi4usXsjLxIFY0HS3wJXjRE9+ykDfKXxMqEIic4BvPsVqvvSCsHk0Sy4vECDDdxDYSqwW9L+ozvWaWqtC2wjr+aLn8X2kDLGpwNMA4UfNWrrY7GiBQqEAMLsHiRVtCxrFuiPXezaOUMeZn6t9M6XugjG97zBSMZ9TRVBttNrPVln0XgB261Ze8galw0aat+Mzu/AxS8rWBGx8rIgOG4JdfPpapAU+lCGT5NIK22J3fSC5f3WCYJuMPI9uviRwwoeyMjP1td7Pg6flW6kSTd0wlHe+tjpun07aLb7LOXgl/gEbzqiUNPmGAYkqHmrGPkNPeSJeDS+tzIQk6XBcuhMz1vFlynE7DGVCOzW3ny6JWB8hUp7GI8V8mBQJBg6rPIhvyodO/vG9P8lW3bC2l61VR/qRy+oIsCd9F2Yfh816LD8EZQ6cxYvx4/kACqWGXWy1npQ3OMHe/rkomDT6gyD/jvXJXmjTZiZfX+A1gCYqshfdbnhJXyau2k8/G8fOTvod3mRk6OwX4cXplF7t6xxjj10ypruIBpzTuApxSAu/LkVvmtWCtzCI0+J1APMd3sED61RNsDHEa3iDLBdBEaSUKrCwAWo58VCIq6h4YEwEeEb3tj8xpfYqsJ7vabqmFs4bSCBCYBA12yeBgu+Y1sHAnYF+clQOewOeQfmqe1KRX0wcuN3fXFN+qLKR72ttmd3out6i+WYGACWLF2o8/8DBHpAoVMdK2MCW6w8KxJupi7heKWDEWJoSwBS9sH0blU4BAXkf04AYAcPuTeN7krPzU/VoWGX+TIHgVgLz6DRKQesMjqWmQi3TeaZq2HiF9qrFRKasE4eMVGshk6z8YXHrc0gSu4n20FV6ZrSRZGUg2q4fF+GgAHxDxlJ2hBaxqtTs/YYYZZ6L2oQUs5FzwtwELynQGaWngx5Zm6eDaIQZWmFisNo01iKs/Xg0lB02nYEQNU/HlYCtW4WO5neOMeBFSaKT9M+YnFpgYTPgNqHQ3MhwzokrhFTM8psxjVgf07gbvAorMQ+Nz+OJcbyaXZOnLIRtvdNv2rY4dc/FHZ4EsXnq7xSGTJ4zy3dHGhsQKnXZTx24GsV5m8OqwBrqcinh8mjZgjfTmr7iX8xGzOAZq/j1ifq3RPGvz166t9duTEG608XdMCdA6uIuIDRbvRRXA/CSg+ctBvMbZgsXezV2+rKP0wD+iTEyFE6JZ2KsZhgWLKT/SjcQqp1FAzJYDit3/cNaTn5fXFkvm8HsyTYulUQe2iYpDZZFOsAJHj4L72yjVierRtjj1xWFJfjcTDUFB78vlNYuxxzGys4UMT1UlGo2rXbwCs+aL874KfoNVzYWhWJUAi9CUoX62d7Su+fOn1h4/op6OtXK4eRUkzCcjC9kSvwaussPHDXAAQ8FmYU0qw4RZ1OeTPC0L9Xu0OqbXm7dyq2yBoEML2RlaGpzoDrPg0izEQkjirOVfTpDA/QuDgpMGBec0d3/Wqbes4rL5E6+WwBRLhmOtOWVRaat8y6szwa7z2pKSNIrbuvM+V0sn8DlkPeKYxRInysD+LOvHZGSS3qd1knyPaJbGXvreTWLzyqfdGvqin9ZvtNwYCZeJx64znU7mAsTEiP+blLtWe7ZS8BkwC4sNdMhWOWoH729JmqOtxQgC6S7hAzJzEWg3y0uxXeZm9wJWw/3/r9fyUken3CzO7jsRJnKBpI30I1Z8CJIkfexisfLeStX0EtR3fYnvBFzbBAm0LpfrGDmBYkP8GjILkuNBVDpYqnA9cJLp2xvWPFTLn4zEz9RUQCkjlNe5UnVIzF9AkanKMLEwYbRR1sXIOBJ3kfzTT7I8I91xBfFWFv/K3+mk/Jbg6PS0/QCrQ1xg797Hs7Y4Qq7971GDA8Wx84lQ4BecVW7zuuibCfNvsP1R6agqWKU9rHBKtsk0VJS1uvSzkuleG9tWqd4nSRiHFJ9vrSdKWm07LwU5Y7ro0cb5sLZkqCYm6rlG5B+0DpMyygGIzxT5iO82IBmXIij9zjFrQaMCk1Mpq5z1/Do4GbdAGK1KBLq6FGafbJ1CcteD3hXMkgwowWqWuNmo7/BmwQhQ6ljfd7094B4Mo8Imaf4YP0gBGH35xAAHTy+eoxYVysDH+i7cvXhkdMbUl+goYOX3fLAj60E8Fyd3NcXquL1XF6ri9VxbcA7Sccx51ZVgbzpyi8y0380x5aZPcgxyKlo3yBPElKnQwfWtILdin4/Rx3V6gCkvYSGG1WbnQhtIOZro3GCRlXMf64aLzqkRlelwb4K9lijcmPL6FyB7N1o6cYiPM9ua/8cAYVgXAAAA73AwGiIpjcI6GXq6oMHbu68c8VHcUpopE12tAv7JV+1DiuIgTp8uhEKwIoxoYXPUNlYmNmOHThmxvpX6PXeAAZA0r9/XaBs0cJ8MCrSRDXIFGBMBGLQUHoDnaiJr7FRTIxsZRcsoAANteTGMQAPIDAJOvibr21BtklOZ8WJ8mlWQ8umsk5KYAoPuv08p2ud0E55yeu1ab/s/6sgzetru9pb88SpUH7he6ucp+IiAdjZEylVM8zzPM8zzPM8zzZ7/jfZrh7BDqJkmSSc9bXP+3CbD19ml9/Wcp2sfra35saUWQ/Esop1PBKnjinea4wbZoPUCKgIDD5VCH2A+RkwbfDEulJmtcblIfnv5w4LrlovGVnCY5fwfsRab1gY5HbvLI7AIUmj6iTgBpCVvG0UuiSdh/IcBTaiAxQzLxsIBXw0vmFC384LSMzRbUVne/TucmwjK3GXVHW2bKmm9CGhX+RW8A+4vP5w1tqk/7qvk3vUGNJtiS+hjVqGPunqDCijeeD0dpTCI6bu03UFgR1IkeWVFeYpe3n8BQBs5YdImeqFzfuhVTGxWgKed4QkArTkHrjFjTPNxmRq/FjgaExuPtF/39eX+OfSLZiDLjUGVEPa7ilMO7/ISMQeoPDuOXC/kYalwsUcxJryJc3pb0gUD1vQsxXw10xDMhTPiC5JvmmxiK0aFjzXgKL+MMvwDGSvwYu14nEB17lZ1RHEq9Xmy+EjvVpNk9afxEAJT8WlTYFyDIjwHX7DXcvaTR8m+ZoFBuIm+Wd+pFMtmgBoBHNYfzJr79yN8UQ8x86ayfh08Yayn5cGsAj/fwkecMl9e/XWWcMm0ijuT+iZ/hAHwS7XeLgANMn7EqPrkyVMSyqYvKhSr5XJYuxxZUZ8OV1GQCFPxi2HoojjynSlVbFJIOZ5yIPMWfgfY5F+sDK9+7NT1Ccow3atTBQtU5A7IhUPJ89FSnd6b9IhJde6To3ftdintcoJoF2OoRbmLfIzUoGS5Bc2zwIBBy3n5nVSTmv56fxjCF8Gn+W4hyKNi0JZRC8RRWPHGTvFkOVVKVnonQ3mPZw453iTHj36M7ibcrbonGgDlNdStNqt8EzZOcvzeSoYaHfZulVRDA9cueGktMD1m8jl9DuRkuPEaYpq/fWouNVV3lyS77Q7Gy0aWOBwJ6flGDMfN08p5ypbI7X00BHMt6tWsxVcx1hz9FelXX/muJrv4yiJPGj/aTv0xHGvYU6xtPa5zKvye/cvENFzVR9rlb9HNRrF55Wf+CHQWp0kFzmEULFNwz5kXLPZ1rUMMoM/1+J0CNWdU8K6n/H6uT7yVNcNqUSRDn6vDhboIx9293KTYmvcA/rOQPw7itD4tnCwwUVIkRAh/VWwgEUvHHC7qW1GOrp2n2IdosM+VUQckvgXOjkfokA0DUYRIAWMzlXV9P+5aC9HD2jsrvyHcgrNZFpTZACVGmKKE9C36HH/M60u53DVgVSFKW9QCDql4CpyKI/d2GldebOlpjXLNLh6HxQNj+FoRNsz3qyH3JlPX69XA8S0hi8yFzeIJQFsVnZkxha0isB1iN9rI/jVhUlHUfzVIwTjPEkhUGFi+Z5oDa8WmVzAvmplsq0WFxOPKw6G6rnPMz0kupSMt1/O8EKTRH2eQfrHMXIv/v54J/8DEXaepylM2RUn7a5WIA7GyxJfQxDCJOatTgwcvN4tYkjBWD/IZrGUj70ddiX6nouFcztTIOQbky/EhNx0qb9L3R0DCTbSU489TaVNBHXwO8hvoCtOdJu8tdim1iTFZypm5xOOhDrlIj86Q2FE3Y0A+z+3yyTsAiAfg45GIyDYCIozjAWa3wc96uhFn5PRcgBxSd3eY2QsoNq6Ea2eF/UNnG8QYGl+EEWrMx1h5SM9GBYHqHxsGX+OM5k0FwXTAdr6sExQVL/WCb85V5VVC8k58wiec2jPNRNaTABrYjRHdx9CR4No+pVBr3U0rnwlcwVckPTpVH2PQ/Wrq8neXeywJF/69WSc0C1sHcPjlo3+AN4EdJFaax2IqBmZdTH3cp1Y/r8uwYTydQESLoh2TqLodmdAZrQM2D3uqs719MFjSz2Fax1jpG4X+lzQc49VcVHEGW6mhm2/jtdkPuTKcMq6zA/ELLAckqx1doKkkttzevCn/QOv83HS+gzKy3pvupmVSNfttRre8DXol9gu5zZYmRkKRh/1n2+7zuQl8mslk52/KIX4O9GHkmK9NnI0Uy0HeeyUF8ccuhhg5U/7CD+K0YITglKq78u+NLmYA/gKXW35PoVJnAhy5YQLbYyZFZz94JmfZMjuageTjP2ZljzkqWNIO1iDPzTp7BTTO2H3ve1imEw8IUiHbxVwC/ZcYukbRkL8RzrmQmUgzeFJnOZBZzht/rVJPPBvmhGQJu0fDwlP8SNgSZpNFqhJoJkDbxdD5dw7lcKjOhxIMMcW4GyFpER+GgHfVXwR5OpMC++MNAs2a7b4pU9IV5pjvyOxMJRdCh/pvHA32VLUulP6s6m7Beyv4APZP06ynMBUSsl5lym66eNlw5owTVXxa2yQaC0+kkeAeHDjYW7docZLmRB0HV+WY6fLG8QEnedo/YN6t7IPOJejnhUgbx/kPRhVnvWP/emW6L8W7irEUbrSWR6C8RlAPGGT5SgB3aMyKu3hMojam/Or+FtZijwvRNxt6K4GZclU3mLe+Ll79k4buM/G0buF+v/5sGYrSLXa9yjutEGwOF0dpz05HcnMLcafXcqBAU5a2ETEipG4hSHd19HkAM7HXXpyFOR+ZjKfO/khY/ujATpX0MVJwfZC86H97/rMSTtsOgPOvHe0ryQOPRTlrrTyf8IVyr9edaT8hMPGr2hIT6Z7Nb8hUFLgFs1UaC9E2+dw9iU9JUuYItdKcGIeoYSyx3GpnH0bwmpdBxFYoSvpdzQou1+w3X+vkluADiiNCeV/D3R38yRmv0FQqP896ADGAvKtlCVZ9qtaLKVP4GRMr3sdAyFxIB2QtvPw5xXaKLAiqOtxQoMuR3C5MG/C1uUllf3Uf1Ofp/2zm33p2DbisP0z4knATQWu/V9feZDX1kMRzHTzpoL2i0T0CZrcDGVEZwADJ1aGKLwwBvaCMwYiqc5ssuAGIdJDEVenlEIHyuIwsksrVeazlucpdz5jl+B7MvC11s/ZhQEYyIrK0LpuKqXv43lNhLvn8AZZ35JgetPReBiwXJnFkl6+uwK3AbBBAnRhJLNxUuh3Po9exKam0lBTocd6KF6bU2M7tRAlxvuE2/jNy5N9aw7VILcb3aGc2wUTDhcNjfXrUuBZq3usbhhM4qJ+rKOUQN5bX6Pew4otBRx0HEQpAOu/vbe8P18U7xB91W6TNqXZKwZVZ83Qsca8Vbg/LHe8Q6mAEe0JmgT1ujq8w6aDhQWoQ3b1NUGuUQF3OUY4iFbtAFlfH0Yf1ukizdtgBz/4dcr+KHLCDJrBxUOieslSsw10vxG63eekuGVRmbuJ9cfk0bt4vz2eRqQfRP+5RZ40NZP25wbxD8pVpkhrglXmDjlDOmiKBa7aJ2y0ZaN1YY44H2K1fDdY9s+yPL69Kc1Q75BU1JHQYU5IvJlIXTztdSS8aq4swAk9BHDRlOA3+U5O+XayL2P6INLLYzUf5lybMWG8JYlc5PHS8QK9U1XmNfQue7oCyloHwqfaH+gNwRdKIwZA3AC/9JVIaCaWJD0dWY+ymMYDdZ91ps/y9lkiUBpLKMH57s0vAv82fpGMZLPy7GabTFKA1OhVZWCkb6IFpTPaitTxVpWABh52891kNrNTsKidRW8hpM/JAh+u1LMm9QivYIRZ2eaJTuejuXxn/vBzTBZ4ZZTCRaFRYyvSJkOaSLkeSGST/idUMG9UAPFmCUBlsMf5cUe4KgA9O3PHSSeV1BGfJXxRyedAAOG2IMuRxI/G1fs8Rn0wDDmQqp5OnOL8S7J/p7znAJZTlP5WXyBcwiwf9ikoLSqgUtLAN7NwEsvNz5KlW+3kp/W8bfyhV3qGDqbE5BZcHWptXWwwLmNZCHPeYZpT/tWGFQQnZKymAJfu1SR5IZJP+KAySiVmQZHP56Elt29M26cLeOYTEAycwbkyS4v8YMpRFU+uqUq7esYbjvkOl8I10u4aR/anFj/MgrQgoOBXbDmOpEUsXJZ/bBGgxdyAU8PGp6H8pEIzch4BU5289aeC+nflqQ0zYFFPrIGpKmtrYlRxNVHlK1ATAYhAn2wyxkVpuM1jwT9Zx2mYGQeeKHStoojOE+iB4hH2X9D98+KnL/1Fctr6OZh9NQFbB52eQV/+mc8OhBdUHkJbkdgO1+ref8ARsiEyElOTuy0rnqAMv3oEOnczkic45MoBIVtgLIchZDUxXCob5SjAuL/b2poyHje8rml9Bue3bWCmC2wk5qI6DGigdpEd+fVx8izqR/B0BcWzbbBV7/+zFoAdHY15GJeKSWRuESp/L7kk/9TigFoL/dU8/Mc6eIxuncW3q9X03eMobm2T39KlgoOv5hhE7wRFa7h7UE8jDkCYYbo8rSUX6ypE4XoJTQVcuko4lX/sGzvIapZC9qoEw4GVZCvzuGKkhVljlMoSwQCGdpHRUsbu7RD5QMcRlaS+cEkyCW0zJA1Vl395Cd9StXgDUb8j1RnP9xqmwnFojPWQNyGBMNymgx+q63fslADXNmFkYP2EsLvII8XVAZ92lx5Bktt1fTfdWEhIjiLKh/gaLrj/LNa3j8faHl8oYDJaYzOpJ/tdjHxMs5reLvJr1o2rSLjona74GrNLeWPQTTVK31cSNU4npZq3dRxzC8lEOloHg+916REEf2bVCoD1/x7kJM1fX+KCQgj2vksIdYyjtR4TWYBvSmeBpIPEP5UDITMAlaL8S3LAMBIfqJsI2y1Ff+JRZsmw6vzhMPhzmCpAjYPipma5mIbWeB2LiBeSUcdOVUN64CvH6YdKZdu0G7qFuIft2EfWFseCkD6BSSrxkABOZW0tW/WFcEYnFbm+A/OwknfWNPWoTml/JJMpT/yJ1QGfdHO/NncJ9b3KpndFKopwVw7oCDzMCwJpDh5vet4/TBRie+xq+/rFl79Wo4NA8N7fKrZwOgGhTBhl5bRTANR+B9EOHo8s3oATVZm07Ei0kCHPuDmiNukIfdx1qakXHizX287WCiXqVc/iCAosCrnapspIuyWAxytJJfdudlV+Q8UQcnkaJitYB3Bh5hbSwFvoNQQwoWM1wc3Vlt29RlfpsYfJ4uH427IPlMixtjpJT37lBhaaUv6DJ2ptuzDjq27CzR6NN3nxMy2qN7zmYyCi8gOIfcH0Fb23/7Xi4Vl0f3e6Blh11WufzTL71LlEnAoPgD768er7utEBwin8q/6WLvY+71EefzUoTQvzwUKQ1y7Cb0lkaA98msjj9RN+JfEqEni4SeqiiDntEGejTLwA9l249kCQ0jWk3DGw44+PjDmOhe8p/CGFJ5zhHAw6wUBLYcNrbDDJpqvXvQcPY9epltqKc/5UOWs53xQHGO6gUQLs19827fx4pVFiT8lIjORVKArbYXUI2aRxn/RaZkrWf8pxYZcakPVALIz1owvSQgAgn6PWIJKOzMMk5/N4gBuFQ9itxHNi4XuJXkjmgaCDscT7rlLZIw+Atmh/IdJQd/wiFczUMbLDZL2rUC4h0qMH4NyZViRYC5n5HxxA+TRY68I2i2jCrmrp5XZNTh3P0vXQcksJOxz3s4aSYw/cGLJs+OfaR3Bn1T/pcxBBVMprqUQO+MlFlmUFmYACET947BlkwJAzhYOpwcw08un3XwJ/RS8qwqwIa7FMqI7pmWVSuU2fgA50NikAckAjftIusMXw9dY/14yc/Yn1nKIA1GLHyg81suVflyAo01pnXQZ3KOwO6pJQJ0+azM/E7GsRYMlnm5BU0Qv+p+Y7LpTXYSbd/mI7JEQaP0nAK0oV/zXjFe+L0N+AlLBliqiILrc3B02b+4Eg1fDOlAGNkQqz2M3ksR6uwyZtEWnxgdh0Dos67ibPS9Q6ZsVHffq6QFAwKXTk+oBIirzUIUfw3+dnPuKTciDaiqKQWBv7ViqDWTGGMMYc+Fkq5bEg3t+sstKM00FgvjvxL9X20sbVRJT5ewUxLxqlDQfSmAwV/nZyebKs8ioChDmQJ5indkwZ2pzyl0x5v8i80ZOOUyPmLOvh1GDN7mkd3ZCpXStfdzfkCstA47K9UFYsnFLIQOurgt60CK6gcIeBi1a5myoHyI2MmkzgxaL1kUUIk5V6gyXD+brUqif5RkTjM7a0QzT8Xmi9EN4FZ/4+AvLuMo7H0yzwd2nvvnZdGM+lpuH+BwnOK3LzqwqaAtPrKe+l2CfoKsWyVT4CRGUlEP9muTbo1CK3E80A5T+O1A6qRq3sBEbjTLcnMsjlp6MBly7HjQGh+k2vtQ/DBSta0asM460JSnH09bRSRTKNNsbtuzNLc2y7oSCx7YABlYAAAA=">

    <!-- Manifest inline pour PWA -->
    <link rel="manifest" href="data:application/json;base64,eyJuYW1lIjoiTnV0cmlUcmFjayIsInNob3J0X25hbWUiOiJOdXRyaVRyYWNrIiwic3RhcnRfdXJsIjoiLi9pbmRleC5odG1sIiwiZGlzcGxheSI6InN0YW5kYWxvbmUiLCJiYWNrZ3JvdW5kX2NvbG9yIjoiIzFhMWYyZSIsInRoZW1lX2NvbG9yIjoiIzEwYjk4MSIsImRlc2NyaXB0aW9uIjoiU3VpdmkgbnV0cml0aW9ubmVsIGNvbXBsZXQiLCJpY29ucyI6W3sic3JjIjoiaWNvbi0xOTIucG5nIiwic2l6ZXMiOiIxOTJ4MTkyIiwidHlwZSI6ImltYWdlL3BuZyJ9LHsic3JjIjoiaWNvbi01MTIucG5nIiwic2l6ZXMiOiI1MTJ4NTEyIiwidHlwZSI6ImltYWdlL3BuZyJ9XX0K">

    <!-- Viewport optimisé pour mobile - Empêche le zoom -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <title>NutriTrack</title>

    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>

    <!-- Fuse.js pour recherche floue -->
    <script src="https://cdn.jsdelivr.net/npm/fuse.js@7.0.0"></script>

    <!-- html5-qrcode pour scanner de code-barres -->
    <script src="https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js"></script>

    <!-- Favicon - Toutes les tailles -->
    <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
    <link rel="icon" type="image/png" sizes="192x192" href="favicon-192x192.png">
<meta name="theme-color" content="#10b981">

    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
</head>
<body>
    <!-- Splash Screen - Visible during boot -->
    <div id="app-splash" style="position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background: linear-gradient(135deg, #0a2418 0%, #0d3526 50%, #0a2418 100%); z-index: 99999; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 32px; overflow: hidden;">
        <!-- Background animated circles -->
        <div style="position: absolute; width: 300px; height: 300px; border-radius: 50%; background: radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%); top: -100px; right: -100px; animation: pulse-glow 4s ease-in-out infinite;"></div>
        <div style="position: absolute; width: 250px; height: 250px; border-radius: 50%; background: radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%); bottom: -80px; left: -80px; animation: pulse-glow 4s ease-in-out infinite 1s;"></div>

        <!-- Logo container with animation -->
        <div style="position: relative; animation: logo-entrance 1s ease-out;">
            <div style="position: absolute; inset: -20px; background: radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%); border-radius: 50%; animation: logo-glow 2s ease-in-out infinite;"></div>
            <img src="logo.svg" alt="NutriTrack Logo" style="width: 120px; height: 120px; position: relative; z-index: 1; filter: drop-shadow(0 4px 20px rgba(16, 185, 129, 0.3));">
        </div>

        <!-- App name -->
        <div style="text-align: center; animation: fade-in 1s ease-out 0.3s backwards;">
            <h1 style="margin: 0; font-size: 2rem; font-weight: 700; background: linear-gradient(135deg, #10b981 0%, #34d399 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; letter-spacing: -0.5px;">NutriTrack</h1>
            <p style="margin: 8px 0 0 0; font-size: 0.875rem; color: rgba(16, 185, 129, 0.7); font-weight: 500; letter-spacing: 2px; text-transform: uppercase;">Suivi Nutritionnel</p>
        </div>

        <!-- Modern loader -->
        <div style="display: flex; gap: 8px; animation: fade-in 1s ease-out 0.6s backwards;">
            <div style="width: 12px; height: 12px; background: #10b981; border-radius: 50%; animation: bounce 1.4s ease-in-out infinite;"></div>
            <div style="width: 12px; height: 12px; background: #10b981; border-radius: 50%; animation: bounce 1.4s ease-in-out infinite 0.2s;"></div>
            <div style="width: 12px; height: 12px; background: #10b981; border-radius: 50%; animation: bounce 1.4s ease-in-out infinite 0.4s;"></div>
        </div>

        <style>
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
            @keyframes logo-entrance {
                from {
                    opacity: 0;
                    transform: scale(0.5) rotate(-10deg);
                }
                to {
                    opacity: 1;
                    transform: scale(1) rotate(0deg);
                }
            }
            @keyframes logo-glow {
                0%, 100% {
                    opacity: 0.5;
                    transform: scale(1);
                }
                50% {
                    opacity: 0.8;
                    transform: scale(1.1);
                }
            }
            @keyframes pulse-glow {
                0%, 100% {
                    opacity: 0.3;
                    transform: scale(1);
                }
                50% {
                    opacity: 0.6;
                    transform: scale(1.2);
                }
            }
            @keyframes fade-in {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            @keyframes bounce {
                0%, 80%, 100% {
                    transform: scale(0);
                    opacity: 0.5;
                }
                40% {
                    transform: scale(1);
                    opacity: 1;
                }
            }
        </style>
    </div>

    <!-- Login Screen -->
    <div class="container" id="main-app" style="display: none;">
        <!-- Bannière statut connexion -->
        <style>
            @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
            /* Sync indicator styles */
            #sync-indicator {
                display: flex;
                align-items: center;
                gap: 6px;
                padding: 6px 12px;
                border-radius: var(--radius-full);
                font-size: 0.8rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s;
                background: rgba(239, 68, 68, 0.15);
                color: #f87171;
                border: 1px solid rgba(239, 68, 68, 0.3);
            }
            #sync-indicator:hover { opacity: 0.8; }
            #sync-indicator .sync-dot {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: currentColor;
                animation: pulse 2s infinite;
            }
            #sync-indicator.connected {
                background: rgba(16, 185, 129, 0.15);
                color: #10b981;
                border-color: rgba(16, 185, 129, 0.3);
            }
            #sync-indicator.connected .sync-dot {
                animation: none;
            }

            /* ===== NEW HEADER LAYOUT ===== */
            .app-header {
                text-align: center;
                padding: var(--space-md) var(--space-xl);
                position: relative;
                z-index: 9999;
                overflow: visible;
            }

            .header-main-row {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: var(--space-lg);
                margin-bottom: var(--space-xs);
            }

            .header-left {
                display: flex;
                align-items: center;
                flex: 1;
                min-width: 0;
            }

            .header-center {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
            }

            .header-right {
                display: flex;
                align-items: center;
                justify-content: flex-end;
                gap: var(--space-md);
                flex: 1;
                min-width: 0;
                overflow: visible;
                position: relative;
            }

            /* Greeting badge (gauche) */
            .header-greeting {
                display: flex;
                align-items: center;
                gap: var(--space-sm);
                background: var(--bg-secondary);
                padding: var(--space-sm) var(--space-lg);
                border-radius: var(--radius-full);
                border: 1px solid rgba(255, 255, 255, 0.1);
                font-size: 0.95rem;
                color: var(--text-primary);
                white-space: nowrap;
            }

            .greeting-dot {
                width: 8px;
                height: 8px;
                background: var(--accent-main);
                border-radius: 50%;
            }

            /* Login button */
            .header-login-btn {
                display: flex;
                align-items: center;
                gap: var(--space-sm);
                background: var(--accent-main);
                color: white;
                border: none;
                padding: var(--space-sm) var(--space-lg);
                border-radius: var(--radius-full);
                font-size: 0.9rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
            }

            .header-login-btn:hover {
                background: var(--accent-main);
                filter: brightness(1.1);
            }

            /* Sync button */
            .header-sync-btn {
                display: flex;
                align-items: center;
                gap: var(--space-sm);
                background: var(--bg-secondary);
                color: var(--accent-main);
                border: 1px solid var(--accent-main);
                padding: var(--space-sm) var(--space-md);
                border-radius: var(--radius-full);
                font-size: 0.85rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
            }

            .header-sync-btn:hover {
                background: rgba(16, 185, 129, 0.1);
            }

            /* Title - même style que home-brand */
            .header-title {
                font-size: 1.8rem;
                font-weight: 800;
                color: #ffffff !important;
                -webkit-text-fill-color: #ffffff !important;
                background: none !important;
                -webkit-background-clip: unset !important;
                background-clip: unset !important;
                display: flex;
                align-items: center;
                gap: 12px;
                margin: 0;
                letter-spacing: -0.5px;
            }

            .header-logo {
                width: 40px;
                height: 40px;
            }

            .header-logo-fallback {
                display: none;
                width: 40px;
                height: 40px;
                background: var(--accent-main);
                border-radius: 8px;
                align-items: center;
                justify-content: center;
            }

            /* Subtitle */
            .header-subtitle {
                font-size: 1rem;
                font-weight: 600;
                color: var(--text-secondary);
                margin: var(--space-xs) 0 0 0;
            }

            /* Profile button wrapper */
            .header-profile-wrapper {
                position: relative;
                z-index: 10005;
            }

            .header-profile-btn {
                width: 44px;
                height: 44px;
                border-radius: 50%;
                border: 2px solid var(--accent-main);
                padding: 0;
                cursor: pointer;
                overflow: hidden;
                background: var(--bg-secondary);
                transition: all 0.2s;
            }

            .header-profile-btn:hover {
                border-color: var(--accent-main);
                transform: scale(1.05);
            }

            .header-profile-btn img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            /* User Menu Dropdown */
            .user-menu {
                display: none;
                position: absolute;
                top: calc(100% + 10px);
                right: 0;
                width: 300px;
                background: var(--bg-secondary);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: var(--radius-lg);
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
                z-index: 100000;
                overflow: visible;
            }

            .user-menu.active {
                display: block;
                animation: fadeInDown 0.2s ease;
            }

            .user-menu-header {
                display: flex;
                align-items: center;
                gap: var(--space-md);
                padding: var(--space-lg);
                background: var(--bg-tertiary);
                border-radius: var(--radius-lg) var(--radius-lg) 0 0;
            }

            .user-menu-photo {
                width: 56px;
                height: 56px;
                border-radius: 50%;
                object-fit: cover;
                border: 2px solid var(--accent-main);
            }

            .user-menu-info {
                flex: 1;
            }

            .user-menu-username {
                display: flex;
                align-items: center;
                gap: var(--space-xs);
                font-size: 1rem;
                font-weight: 600;
                color: var(--text-primary);
                margin-bottom: 4px;
            }

            .user-menu-username .status-dot {
                width: 8px;
                height: 8px;
                background: var(--accent-main);
                border-radius: 50%;
            }

            .user-menu-sync-line {
                display: flex;
                align-items: center;
                gap: var(--space-xs);
                font-size: 0.85rem;
                color: var(--text-secondary);
            }

            .user-menu-sync-line .status-text {
                color: var(--accent-main);
                font-weight: 600;
            }

            .user-menu-divider {
                height: 1px;
                background: rgba(255, 255, 255, 0.1);
            }

            .user-menu-item {
                display: flex;
                align-items: center;
                gap: var(--space-md);
                width: 100%;
                padding: var(--space-md) var(--space-lg);
                background: none;
                border: none;
                color: var(--text-primary);
                font-size: 0.95rem;
                cursor: pointer;
                transition: background 0.2s;
                text-align: left;
            }

            .user-menu-item:hover {
                background: var(--bg-tertiary);
            }

            .user-menu-item i {
                width: 20px;
                height: 20px;
                color: var(--text-secondary);
            }

            .user-menu-logout {
                color: var(--color-danger);
            }

            .user-menu-logout i {
                color: var(--color-danger);
            }

            /* User Menu Mobile Fixes */
            @media (max-width: 768px) {
                .user-menu {
                    position: fixed;
                    top: auto !important;
                    bottom: 90px;
                    right: var(--space-md);
                    left: auto;
                    width: calc(100% - var(--space-2xl));
                    max-width: 320px;
                    z-index: 100000;
                }
            }
        </style>

        <header class="app-header">
            <div class="header-main-row">
                <!-- Gauche: Salut + Nom OU Bouton connexion -->
                <div class="header-left">
                    <div id="header-greeting" class="header-greeting" style="display: none;">
                        <span class="greeting-dot"></span>
                        <span>Salut, <strong id="header-username">Utilisateur</strong> !</span>
                    </div>
                    <button id="header-login-btn" class="header-btn header-login-btn" onclick="window.firebaseSignIn ? window.firebaseSignIn() : showToast('Chargement...')" style="display: none;">
                        <i data-lucide="log-in" style="width: 18px; height: 18px;"></i>
                        <span>Connexion</span>
                    </button>
                </div>

                <!-- Centre: Logo NutriTrack -->
                <div class="header-center">
                    <h1 class="header-title">
                        <img src="logo.svg" alt="Logo" class="header-logo" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline-flex';">
                        <span class="header-logo-fallback"><i data-lucide="target" style="width: 1em; height: 1em; color: white;"></i></span>
                        NutriTrack
                    </h1>
                </div>

                <!-- Droite: Sync + Photo profil -->
                <div class="header-right">
                    <button id="header-sync-btn" class="header-btn header-sync-btn" onclick="window.firebaseForceSync ? window.firebaseForceSync() : null" title="Synchroniser" style="display: none;">
                        <i data-lucide="cloud" style="width: 20px; height: 20px;"></i>
                        <span>Sync</span>
                    </button>
                    <div class="header-profile-wrapper" style="display: none;">
                        <button id="header-profile-btn" class="header-profile-btn" onclick="toggleUserMenu()">
                            <img id="header-profile-photo" src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2310b981'><circle cx='12' cy='8' r='4'/><path d='M20 21a8 8 0 1 0-16 0'/></svg>" alt="Profil">
                        </button>
                        <!-- User Menu Dropdown -->
                        <div id="user-menu" class="user-menu">
                            <div class="user-menu-header">
                                <img id="user-menu-photo" src="" alt="Photo" class="user-menu-photo">
                                <div class="user-menu-info">
                                    <div class="user-menu-username">
                                        <span class="status-dot"></span>
                                        <span id="user-menu-username-text">Utilisateur</span>
                                    </div>
                                    <div class="user-menu-sync-line">
                                        <span>Synchronisation cloud : </span>
                                        <span class="status-text" id="user-menu-sync-status">active</span>
                                    </div>
                                </div>
                            </div>
                            <div class="user-menu-divider"></div>
                            <button class="user-menu-item" onclick="switchToTab('settings'); closeUserMenu();">
                                <i data-lucide="settings"></i>
                                <span>Paramètres</span>
                            </button>
                            <button class="user-menu-item" onclick="window.firebaseForceSync ? window.firebaseForceSync() : null; closeUserMenu();">
                                <i data-lucide="cloud"></i>
                                <span>Synchronisation cloud</span>
                            </button>
                            <button class="user-menu-item" onclick="switchToTab('privacy'); closeUserMenu();">
                                <i data-lucide="shield-check"></i>
                                <span>Données & confidentialité</span>
                            </button>
                            <button class="user-menu-item" onclick="switchToTab('guide'); closeUserMenu();">
                                <i data-lucide="help-circle"></i>
                                <span>Aide</span>
                            </button>
                            <button class="user-menu-item" onclick="openFeedbackModal(); closeUserMenu();">
                                <i data-lucide="alert-triangle"></i>
                                <span>Signaler un bug</span>
                            </button>
                            <div class="user-menu-divider"></div>
                            <button class="user-menu-item user-menu-logout" onclick="window.firebaseSignOut ? window.firebaseSignOut() : null; closeUserMenu();">
                                <i data-lucide="power"></i>
                                <span>Déconnexion</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <p class="header-subtitle">Prends le contrôle de ton alimentation</p>
        </header>

        <!-- App Layout with Sidebar -->
        <div class="app-layout">
            <!-- Sidebar Navigation -->
            <nav class="sidebar" id="sidebar">
                <button class="sidebar-toggle" onclick="toggleSidebar()" title="Réduire/Agrandir">
                    ☰
                </button>

                <!-- Groupe Principal -->
                <div class="sidebar-group-title">
                    Principal
                </div>
                <button class="sidebar-btn active" data-tab="home">
                    <span class="sidebar-icon"><i data-lucide="home"></i></span>
                    <span class="sidebar-label">Accueil</span>
                </button>
                <button class="sidebar-btn" data-tab="calculator">
                    <span class="sidebar-icon"><i data-lucide="calculator"></i></span>
                    <span class="sidebar-label"><span class="label-desktop">Calculateur</span><span class="label-mobile">Calcul</span></span>
                </button>
                <button class="sidebar-btn" data-tab="meals">
                    <span class="sidebar-icon"><i data-lucide="utensils"></i></span>
                    <span class="sidebar-label">Repas</span>
                </button>
                <button class="sidebar-btn" data-tab="planner">
                    <span class="sidebar-icon"><i data-lucide="calendar"></i></span>
                    <span class="sidebar-label">Semaine</span>
                </button>
                <button class="sidebar-btn" data-tab="tracking">
                    <span class="sidebar-icon"><i data-lucide="line-chart"></i></span>
                    <span class="sidebar-label">Suivi</span>
                </button>

                <!-- Séparateur -->
                <div style="height: 1px; background: var(--bg-tertiary); margin: var(--space-lg) var(--space-md);"></div>

                <!-- Groupe Outils -->
                <div class="sidebar-group-title">
                    Outils
                </div>
                <button class="sidebar-btn" data-tab="foods">
                    <span class="sidebar-icon"><i data-lucide="apple"></i></span>
                    <span class="sidebar-label">Aliments</span>
                </button>
                <button class="sidebar-btn" data-tab="meal-templates">
                    <span class="sidebar-icon"><i data-lucide="clipboard-list"></i></span>
                    <span class="sidebar-label">Repas Types</span>
                </button>

                <!-- Bouton Admin (visible uniquement pour l'admin) -->
                <button class="sidebar-btn" data-tab="admin" id="admin-sidebar-btn" style="display: none;">
                    <span class="sidebar-icon"><i data-lucide="shield"></i></span>
                    <span class="sidebar-label">Admin</span>
                </button>

                <!-- Bouton Profil (visible uniquement sur mobile) -->
                <button class="sidebar-btn" id="mobile-more-btn" onclick="toggleMobileDrawer()">
                    <span class="sidebar-icon mobile-profile-icon">
                        <img id="mobile-profile-photo" src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2310b981'><circle cx='12' cy='8' r='4'/><path d='M20 21a8 8 0 1 0-16 0'/></svg>" alt="Profil" style="width: 28px; height: 28px; border-radius: 50%; object-fit: cover;">
                    </span>
                    <span class="sidebar-label">Profil</span>
                </button>
            </nav>

            <!-- Mobile Drawer Overlay -->
            <div class="mobile-drawer-overlay" id="mobile-drawer-overlay" onclick="closeMobileDrawer()"></div>

            <!-- Mobile Drawer (style iOS) - User Menu + Options -->
            <div class="mobile-drawer" id="mobile-drawer">
                <!-- Handle bar iOS style -->
                <div style="width: 40px; height: 5px; background: rgba(255, 255, 255, 0.3); border-radius: 3px; margin: 0 auto 16px;"></div>

                <!-- User Profile Header -->
                <div style="display: flex; align-items: center; gap: var(--space-md); margin-bottom: var(--space-lg); padding-bottom: var(--space-lg); border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <img id="drawer-user-photo" src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2310b981'><circle cx='12' cy='8' r='4'/><path d='M20 21a8 8 0 1 0-16 0'/></svg>" alt="Photo" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 2px solid var(--accent-main);">
                    <div style="flex: 1;">
                        <div style="display: flex; align-items: center; gap: 6px; font-weight: 600; color: var(--text-primary);">
                            <span style="width: 8px; height: 8px; background: var(--accent-main); border-radius: 50%;"></span>
                            <span id="drawer-user-name">Utilisateur</span>
                        </div>
                        <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 2px;">
                            Synchronisation cloud : <span style="color: var(--accent-main); font-weight: 600;" id="drawer-sync-status">active</span>
                        </div>
                    </div>
                    <button onclick="closeMobileDrawer()" style="background: var(--bg-tertiary); border: none; color: var(--text-secondary); cursor: pointer; padding: 8px; border-radius: 50%;">
                        <i data-lucide="x" style="width: 18px; height: 18px;"></i>
                    </button>
                </div>

                <!-- Bouton Installer (caché par défaut, affiché si PWA disponible) -->
                <div id="drawer-install-btn" class="mobile-drawer-item" onclick="installPWA(); closeMobileDrawer();" style="display: none; background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.15) 100%); border: 1px solid rgba(16, 185, 129, 0.3); margin-bottom: var(--space-md);">
                    <i data-lucide="download" style="color: var(--accent-main);"></i>
                    <span style="color: var(--accent-main); font-weight: 600;">Installer l'application</span>
                </div>

                <!-- SECTION OUTILS -->
                <div style="font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 1px; margin-bottom: var(--space-sm); padding-left: 4px;">Outils</div>

                <div class="mobile-drawer-item" onclick="navigateFromDrawer('foods')">
                    <i data-lucide="apple" style="color: var(--accent-main);"></i>
                    <span>Base d'aliments</span>
                </div>
                <div class="mobile-drawer-item" onclick="navigateFromDrawer('meal-templates')">
                    <i data-lucide="clipboard-list" style="color: var(--accent-main);"></i>
                    <span>Repas Types</span>
                </div>

                <!-- Bouton Admin dans drawer (visible uniquement pour admin) -->
                <div class="mobile-drawer-item" id="drawer-admin-btn" onclick="navigateFromDrawer('admin')" style="display: none; background: rgba(139, 92, 246, 0.1); border: 1px solid rgba(139, 92, 246, 0.3);">
                    <i data-lucide="shield" style="color: var(--accent-purple);"></i>
                    <span style="color: var(--accent-purple); font-weight: 600;">Panel Admin</span>
                </div>

                <!-- Séparateur -->
                <div style="height: 1px; background: rgba(255,255,255,0.1); margin: var(--space-md) 0;"></div>

                <!-- SECTION PRINCIPALE -->
                <div class="mobile-drawer-item" onclick="navigateFromDrawer('settings')">
                    <i data-lucide="settings" style="color: var(--accent-main);"></i>
                    <span>Paramètres</span>
                </div>
                <div class="mobile-drawer-item" onclick="window.firebaseForceSync ? window.firebaseForceSync() : null; closeMobileDrawer();">
                    <i data-lucide="cloud" style="color: var(--accent-main);"></i>
                    <span>Synchronisation cloud</span>
                </div>
                <div class="mobile-drawer-item" onclick="navigateFromDrawer('privacy')">
                    <i data-lucide="shield-check" style="color: var(--accent-main);"></i>
                    <span>Données & confidentialité</span>
                </div>
                <div class="mobile-drawer-item" onclick="navigateFromDrawer('guide')">
                    <i data-lucide="help-circle" style="color: var(--accent-main);"></i>
                    <span>Aide</span>
                </div>
                <div class="mobile-drawer-item" onclick="navigateFromDrawer('about')">
                    <i data-lucide="info" style="color: var(--accent-main);"></i>
                    <span>À propos</span>
                </div>
                <div class="mobile-drawer-item" onclick="navigateFromDrawer('health-warning')">
                    <i data-lucide="heart-pulse" style="color: var(--accent-main);"></i>
                    <span>Santé</span>
                </div>
                <div class="mobile-drawer-item" onclick="navigateFromDrawer('terms')">
                    <i data-lucide="file-text" style="color: var(--accent-main);"></i>
                    <span>CGU</span>
                </div>
                <div class="mobile-drawer-item" onclick="navigateFromDrawer('legal')">
                    <i data-lucide="scale" style="color: var(--accent-main);"></i>
                    <span>Mentions légales</span>
                </div>
                <div class="mobile-drawer-item" onclick="openFeedbackModal(); closeMobileDrawer();">
                    <i data-lucide="alert-triangle" style="color: var(--accent-main);"></i>
                    <span>Signaler un bug</span>
                </div>

                <!-- Séparateur + Déconnexion -->
                <div style="height: 1px; background: rgba(255,255,255,0.1); margin: var(--space-md) 0;"></div>
                <div class="mobile-drawer-item" onclick="window.firebaseSignOut ? window.firebaseSignOut() : null; closeMobileDrawer();" style="color: var(--color-danger);">
                    <i data-lucide="power" style="color: var(--color-danger);"></i>
                    <span>Déconnexion</span>
                </div>
            </div>

            <!-- Main Content Area -->
            <main class="main-content">

        <!-- HOME TAB -->
        <div id="home" class="tab-content active">

            <!-- Hero Section -->
            <section class="home-hero">

                <div class="home-hero-grid">
                    <!-- Text with branding -->
                    <div class="home-hero-text">
                        <div class="home-hero-brand">
                            <img src="logo.svg" alt="NutriTrack" class="home-logo" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <span class="home-logo-fallback"><i data-lucide="target"></i></span>
                            <span class="home-brand-name">NutriTrack</span>
                        </div>
                        <h1>Mange mieux,<br><span>simplement.</span></h1>
                        <p>Calcule tes besoins, suis tes repas et visualise ta progression. Tout est synchronisé entre tes appareils.</p>
                        <div class="home-hero-buttons">
                            <button class="home-btn-primary" onclick="switchToTab('calculator')">
                                <i data-lucide="play"></i>
                                Commencer
                            </button>
                            <button class="home-btn-ghost" onclick="switchToTab('meals')">
                                <i data-lucide="utensils"></i>
                                Entrer un repas
                            </button>
                        </div>
                    </div>

                    <!-- 3D Food Image -->
                    <div class="home-image-scene" id="home-image-scene">
                        <div class="home-image-container" id="home-image-container">
                            <!-- Info cards -->
                            <div class="home-info home-info-1">
                                <div class="home-info-icon"><i data-lucide="flame"></i></div>
                                <div class="home-info-text">
                                    <span class="home-info-value">1 850 kcal</span>
                                    <span class="home-info-label">Objectif du jour</span>
                                </div>
                            </div>
                            <div class="home-info home-info-2">
                                <div class="home-info-icon"><i data-lucide="beef"></i></div>
                                <div class="home-info-text">
                                    <span class="home-info-value">142g</span>
                                    <span class="home-info-label">Protéines</span>
                                </div>
                            </div>
                            <div class="home-info home-info-3">
                                <div class="home-info-icon"><i data-lucide="wheat"></i></div>
                                <div class="home-info-text">
                                    <span class="home-info-value">185g</span>
                                    <span class="home-info-label">Glucides</span>
                                </div>
                            </div>

                            <!-- Food bowl image (save your PNG as food-bowl.png) -->
                            <img src="food-bowl.png"
                                 alt="Healthy food bowl"
                                 class="home-food-image"
                                 loading="eager">
                        </div>
                    </div>
                </div>
            </section>

            <!-- Onboarding Section (visible uniquement pour les nouveaux utilisateurs) -->
            <section class="onboarding-section" id="onboarding-section">
                <div class="onboarding-header">
                    <div class="onboarding-title">
                        <i data-lucide="rocket" style="width: 18px; height: 18px;"></i>
                        Pour bien commencer
                    </div>
                    <div class="onboarding-progress" id="onboarding-progress">0/3 terminé</div>
                </div>
                <div class="onboarding-cards">
                    <!-- Card 1: Objectif -->
                    <div class="onboarding-card" id="onboarding-card-goal" onclick="openOnboardingGoal()">
                        <div class="onboarding-card-icon">
                            <i data-lucide="target"></i>
                        </div>
                        <div class="onboarding-card-content">
                            <div class="onboarding-card-title">Choisis ton objectif</div>
                            <div class="onboarding-card-desc">Perdre, maintenir ou prendre du poids</div>
                        </div>
                        <div class="onboarding-card-check">
                            <i data-lucide="check" style="display: none;"></i>
                        </div>
                    </div>
                    <!-- Card 2: Profil -->
                    <div class="onboarding-card" id="onboarding-card-profile" onclick="openOnboardingProfile()">
                        <div class="onboarding-card-icon">
                            <i data-lucide="user"></i>
                        </div>
                        <div class="onboarding-card-content">
                            <div class="onboarding-card-title">Complète ton profil</div>
                            <div class="onboarding-card-desc">Pour des calculs adaptés à toi</div>
                        </div>
                        <div class="onboarding-card-check">
                            <i data-lucide="check" style="display: none;"></i>
                        </div>
                    </div>
                    <!-- Card 3: Premier repas -->
                    <div class="onboarding-card" id="onboarding-card-meal" onclick="openOnboardingMeal()">
                        <div class="onboarding-card-icon">
                            <i data-lucide="utensils"></i>
                        </div>
                        <div class="onboarding-card-content">
                            <div class="onboarding-card-title">Ajoute ton premier repas</div>
                            <div class="onboarding-card-desc">Découvre comment ça marche</div>
                        </div>
                        <div class="onboarding-card-check">
                            <i data-lucide="check" style="display: none;"></i>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Features -->
            <div class="home-features">
                <div class="home-feature" onclick="switchToTab('calculator')">
                    <div class="home-feature-icon"><i data-lucide="target"></i></div>
                    <h3>Calculateur</h3>
                    <p>Calcule tes macros idéales</p>
                </div>
                <div class="home-feature" onclick="switchToTab('meals')">
                    <div class="home-feature-icon"><i data-lucide="utensils"></i></div>
                    <h3>Repas</h3>
                    <p>Note ce que tu manges</p>
                </div>
                <div class="home-feature" onclick="switchToTab('tracking')">
                    <div class="home-feature-icon"><i data-lucide="trending-up"></i></div>
                    <h3>Progression</h3>
                    <p>Suis ton évolution</p>
                </div>
                <div class="home-feature" onclick="switchToTab('planner')">
                    <div class="home-feature-icon"><i data-lucide="calendar"></i></div>
                    <h3>Planning</h3>
                    <p>Visualise ta semaine</p>
                </div>
            </div>

            <!-- Nutrition Tips Carousel -->
            <div class="home-tips-section" id="home-tips-carousel">
                <div class="home-tip-card" id="home-tip-content">
                    <div class="home-tip-icon" id="home-tip-icon">
                        <i data-lucide="lightbulb"></i>
                    </div>
                    <div class="home-tip-body">
                        <span class="home-tip-category" id="home-tip-category">Astuce</span>
                        <p class="home-tip-text" id="home-tip-text">Chargement...</p>
                    </div>
                </div>
                <div class="home-tip-nav">
                    <button class="home-tip-btn" onclick="prevTip()"><i data-lucide="chevron-left"></i></button>
                    <span class="home-tip-counter"><span id="home-tip-index">1</span> / <span id="home-tip-total">8</span></span>
                    <button class="home-tip-btn" onclick="nextTip()"><i data-lucide="chevron-right"></i></button>
                </div>
            </div>

            <script>
            (function() {
                const tips = [
                    { icon: 'flame', cat: 'Calories', text: '1g de <strong>protéine</strong> = 4 kcal, 1g de <strong>glucide</strong> = 4 kcal, 1g de <strong>lipide</strong> = 9 kcal', color: 'var(--accent-main)' },
                    { icon: 'beef', cat: 'Protéines', text: 'Vise <strong>1.6 à 2.2g de protéines par kg</strong> de poids corporel pour optimiser ta prise de muscle.', color: 'var(--accent-protein)' },
                    { icon: 'droplets', cat: 'Hydratation', text: 'Bois au moins <strong>30ml d\'eau par kg</strong> de poids corporel. Soit ~2.4L pour 80kg.', color: 'var(--accent-carbs)' },
                    { icon: 'moon', cat: 'Sommeil', text: 'Un manque de sommeil augmente la <strong>ghréline</strong> (hormone de la faim) et favorise la prise de gras.', color: 'var(--accent-purple)' },
                    { icon: 'timer', cat: 'Timing', text: 'Le <strong>timing des repas</strong> importe peu. Ce qui compte c\'est le total calorique sur la journée.', color: 'var(--accent-fat)' },
                    { icon: 'scale', cat: 'Poids', text: 'Le poids fluctue de <strong>1-2kg par jour</strong> selon l\'hydratation. Pèse-toi le matin à jeun.', color: 'var(--accent-main)' },
                    { icon: 'salad', cat: 'Fibres', text: 'Vise <strong>25-35g de fibres/jour</strong> pour une bonne digestion et satiété prolongée.', color: 'var(--accent-main)' },
                    { icon: 'dumbbell', cat: 'Déficit', text: 'Un déficit de <strong>500 kcal/jour</strong> = ~0.5kg perdu par semaine. Ne descends pas en dessous.', color: 'var(--accent-protein)' }
                ];

                let currentTip = Math.floor(Math.random() * tips.length);

                window.showTip = function(index) {
                    const tip = tips[index];
                    document.getElementById('home-tip-icon').innerHTML = `<i data-lucide="${tip.icon}"></i>`;
                    document.getElementById('home-tip-icon').style.background = tip.color;
                    document.getElementById('home-tip-category').textContent = tip.cat;
                    document.getElementById('home-tip-text').innerHTML = tip.text;
                    document.getElementById('home-tip-index').textContent = index + 1;
                    document.getElementById('home-tip-total').textContent = tips.length;
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                };

                window.nextTip = function() {
                    currentTip = (currentTip + 1) % tips.length;
                    showTip(currentTip);
                };

                window.prevTip = function() {
                    currentTip = (currentTip - 1 + tips.length) % tips.length;
                    showTip(currentTip);
                };

                // Show initial tip
                showTip(currentTip);

                // Auto-rotate every 8 seconds
                setInterval(nextTip, 8000);
            })();
            </script>

            <!-- 3D Tilt Script -->
            <script>
            (function() {
                const scene = document.getElementById('home-image-scene');
                const container = document.getElementById('home-image-container');
                if (!scene || !container) return;

                let targetX = 0, targetY = 0, currentX = 0, currentY = 0;

                function handleMove(clientX, clientY) {
                    const rect = scene.getBoundingClientRect();
                    targetX = ((clientX - rect.left) / rect.width - 0.5) * 2;
                    targetY = ((clientY - rect.top) / rect.height - 0.5) * 2;
                }

                scene.addEventListener('mousemove', (e) => handleMove(e.clientX, e.clientY));
                scene.addEventListener('touchmove', (e) => {
                    if (e.touches.length === 1) {
                        e.preventDefault();
                        handleMove(e.touches[0].clientX, e.touches[0].clientY);
                    }
                }, { passive: false });

                scene.addEventListener('mouseleave', () => { targetX = 0; targetY = 0; });
                scene.addEventListener('touchend', () => { targetX = 0; targetY = 0; });

                function animate() {
                    currentX += (targetX - currentX) * 0.08;
                    currentY += (targetY - currentY) * 0.08;
                    container.style.transform = `rotateY(${currentX * 12}deg) rotateX(${-currentY * 10}deg)`;
                    requestAnimationFrame(animate);
                }
                animate();
            })();
            </script>

        </div>

        <!-- Calculator Tab -->
        <div id="calculator" class="tab-content">
            <!-- Hero Header -->
            <div style="background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%); border-radius: var(--radius-xl); padding: var(--space-3xl); margin-bottom: var(--space-3xl); border: 1px solid rgba(255, 255, 255, 0.05); box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);">
                <div style="display: flex; align-items: center; gap: var(--space-lg); margin-bottom: var(--space-lg);">
                    <div style="font-size: 3rem; display: flex; align-items: center; justify-content: center; width: 60px; height: 60px; background: var(--accent-ui); border-radius: var(--radius-lg);"><i data-lucide="target" style="width: 36px; height: 36px; color: white;"></i></div>
                    <div>
                        <h1 style="font-size: 2rem; font-weight: 700; margin: 0; color: var(--accent-ui);">
                            Calcule tes Macros
                        </h1>
                        <p style="margin: 0; margin-top: var(--space-xs); color: var(--text-secondary); font-size: 1rem;">
                            Trouve les macros qui te correspondent en quelques clics
                        </p>
                    </div></div></div>

            <!-- Alert box for warnings -->
            <div id="profile-alert" style="display: none; padding: var(--space-xl); background: rgba(239, 68, 68, 0.1); border-left: 4px solid var(--accent-danger); border-radius: var(--radius-lg); margin-bottom: var(--space-2xl); box-shadow: 0 2px 8px rgba(239, 68, 68, 0.2);">
                <div style="font-weight: 700; color: var(--accent-danger); margin-bottom: var(--space-sm); font-size: 1.1rem;"><i data-lucide="alert-triangle" class="icon-inline"></i> Attention</div>
                <div id="profile-alert-message" style="color: var(--text-secondary); font-size: 1rem; line-height: 1.6;"></div></div>

            <!-- Main Grid -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(450px, 1fr)); gap: var(--space-2xl); margin-bottom: var(--space-2xl);">

                <!-- CARD 1: Tes Informations -->
                <div class="card" style="background: var(--bg-secondary); border: 1px solid rgba(16, 185, 129, 0.2); box-shadow: var(--shadow-sm);">
                    <div style="display: flex; align-items: center; gap: var(--space-md); margin-bottom: var(--space-2xl); padding-bottom: var(--space-lg); border-bottom: 2px solid var(--bg-tertiary);">
                        <div style="display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; background: var(--accent-ui); border-radius: var(--radius-md);"><i data-lucide="user" style="width: 22px; height: 22px; color: white;"></i></div>
                        <h2 style="font-size: 1.3rem; font-weight: 700; margin-bottom: var(--space-md); color: var(--text-primary);">Tes Informations</h2>
                    </div>

                    <div style="display: grid; gap: var(--space-xl);">
                        <div class="input-group">
                            <label style="display: flex; align-items: center; gap: var(--space-xs); font-weight: 600; margin-bottom: var(--space-sm);">
                                🎂 Date de naissance
                                <span style="color: var(--accent-danger);">*</span>
                            </label>
                            <div style="display: grid; grid-template-columns: 1fr 2fr 1fr; gap: var(--space-md);">
                                <select id="birth-day" style="width: 100%; padding: 14px; font-size: 1rem; background: var(--bg-tertiary); border: 2px solid var(--bg-tertiary); border-radius: var(--radius-md); color: var(--text-primary); transition: all 0.3s; font-family: inherit;">
                                    <option value="">Jour</option>
                                </select>
                                <select id="birth-month" style="width: 100%; padding: 14px; font-size: 1rem; background: var(--bg-tertiary); border: 2px solid var(--bg-tertiary); border-radius: var(--radius-md); color: var(--text-primary); transition: all 0.3s; font-family: inherit;">
                                    <option value="">Mois</option>
                                    <option value="0">Janvier</option>
                                    <option value="1">Février</option>
                                    <option value="2">Mars</option>
                                    <option value="3">Avril</option>
                                    <option value="4">Mai</option>
                                    <option value="5">Juin</option>
                                    <option value="6">Juillet</option>
                                    <option value="7">Août</option>
                                    <option value="8">Septembre</option>
                                    <option value="9">Octobre</option>
                                    <option value="10">Novembre</option>
                                    <option value="11">Décembre</option>
                                </select>
                                <select id="birth-year" style="width: 100%; padding: 14px; font-size: 1rem; background: var(--bg-tertiary); border: 2px solid var(--bg-tertiary); border-radius: var(--radius-md); color: var(--text-primary); transition: all 0.3s; font-family: inherit;">
                                    <option value="">Année</option>
                                </select>
                            </div>
                            <p class="info-text" style="margin-top: var(--space-sm);">Ton âge sera calculé automatiquement à partir de ta date de naissance</p>
                        </div>

                        <div class="input-group">
                            <label style="display: flex; align-items: center; gap: var(--space-xs); font-weight: 600; margin-bottom: var(--space-sm);">
                                👤 Sexe
                                <span style="color: var(--accent-danger);">*</span>
                            </label>
                            <select id="profile-gender" style="width: 100%; padding: 14px; font-size: 1rem; background: var(--bg-tertiary); border: 2px solid var(--bg-tertiary); border-radius: var(--radius-md); color: var(--text-primary); transition: all 0.3s; font-family: inherit;">
                                <option value="">-- Sélectionner --</option>
                                <option value="male">Homme</option>
                                <option value="female">Femme</option>
                            </select>
                            <p class="info-text" style="margin-top: var(--space-sm);">Utilisé pour estimer ton métabolisme de base</p>
                        </div>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-lg);">
                            <div class="input-group">
                                <label style="display: flex; align-items: center; gap: var(--space-xs); font-weight: 600; margin-bottom: var(--space-sm);">
                                    📏 Taille (cm)
                                    <span style="color: var(--accent-danger);">*</span>
                                </label>
                                <input type="number" id="height" inputmode="decimal" pattern="[0-9]*" step="0.5" min="100" max="250" placeholder="175" style="width: 100%; padding: 14px; font-size: 1rem; background: var(--bg-tertiary); border: 2px solid var(--bg-tertiary); border-radius: var(--radius-md); color: var(--text-primary); transition: all 0.3s;">
                            </div>

                            <div class="input-group">
                                <label style="display: flex; align-items: center; gap: var(--space-xs); font-weight: 600; margin-bottom: var(--space-sm);">
                                    ⚖️ Poids (kg)
                                    <span style="color: var(--accent-danger);">*</span>
                                </label>
                                <input type="number" id="weight" inputmode="decimal" pattern="[0-9]*" step="0.1" min="30" max="300" placeholder="75.5" style="width: 100%; padding: 14px; font-size: 1rem; background: var(--bg-tertiary); border: 2px solid var(--bg-tertiary); border-radius: var(--radius-md); color: var(--text-primary); transition: all 0.3s;">
                            </div></div>

                        <div class="input-group">
                            <label style="display: flex; align-items: center; gap: var(--space-xs); font-weight: 600; margin-bottom: var(--space-sm);">
                                🏃 Niveau d'activité
                                <span style="color: var(--accent-danger);">*</span>
                            </label>
                            <select id="activity" style="width: 100%; padding: 14px; font-size: 1rem; background: var(--bg-tertiary); border: 2px solid var(--bg-tertiary); border-radius: var(--radius-md); color: var(--text-primary); transition: all 0.3s; font-family: inherit;">
                                <option value="">-- Sélectionner --</option>
                                <option value="1.2">🪑 Sédentaire (peu ou pas d'exercice)</option>
                                <option value="1.375">🚶 Légèrement actif (1-3 jours/semaine)</option>
                                <option value="1.55">🏃 Modérément actif (3-5 jours/semaine)</option>
                                <option value="1.725">💪 Très actif (6-7 jours/semaine)</option>
                                <option value="1.9">🔥 Extrêmement actif (2x/jour + travail physique)</option>
                            </select>
                            <p class="info-text" style="margin-top: var(--space-sm);">Inclut sport, marche quotidienne et éventuel travail physique</p>
                        </div></div></div>

                <!-- CARD 2: Ton Objectif -->
                <div class="card" style="background: var(--bg-secondary); border: 1px solid rgba(16, 185, 129, 0.2); box-shadow: var(--shadow-sm);">
                    <div style="display: flex; align-items: center; gap: var(--space-md); margin-bottom: var(--space-2xl); padding-bottom: var(--space-lg); border-bottom: 2px solid var(--bg-tertiary);">
                        <div style="display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; background: var(--accent-ui); border-radius: var(--radius-md);"><i data-lucide="flag" style="width: 22px; height: 22px; color: white;"></i></div>
                        <h2 style="font-size: 1.3rem; font-weight: 700; margin-bottom: var(--space-md); color: var(--text-primary);">Ton Objectif</h2>
                    </div>

                    <!-- Goal selector -->
                    <div class="goal-selector" style="margin-bottom: var(--space-2xl); display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-md);">
                        <div class="goal-btn active" data-goal="cut" onclick="selectGoal('cut')">
                            <div class="goal-title"><i data-lucide="flame" style="width: 18px; height: 18px; display: inline-block; vertical-align: middle; margin-right: 6px;"></i>Sèche</div>
                            <div class="goal-desc">Perdre du gras progressivement</div></div>
                        <div class="goal-btn" data-goal="maintain" onclick="selectGoal('maintain')">
                            <div class="goal-title"><i data-lucide="equal" style="width: 18px; height: 18px; display: inline-block; vertical-align: middle; margin-right: 6px;"></i>Maintien</div>
                            <div class="goal-desc">Stabiliser ton poids</div></div>
                        <div class="goal-btn" data-goal="bulk" onclick="selectGoal('bulk')">
                            <div class="goal-title"><i data-lucide="trending-up" style="width: 18px; height: 18px; display: inline-block; vertical-align: middle; margin-right: 6px;"></i>Prise</div>
                            <div class="goal-desc">Gagner en muscle</div></div></div>

                    <!-- MODE GUIDÉ (par défaut) -->
                    <div id="guided-mode" style="margin-bottom: var(--space-2xl);">
                        <!-- Sélecteur de Rythme -->
                        <div style="margin-bottom: var(--space-xl);">
                            <label style="display: block; font-weight: 600; margin-bottom: var(--space-md); color: var(--text-primary); font-size: 0.95rem;">
                                <i data-lucide="gauge" style="width: 16px; height: 16px; display: inline; vertical-align: middle; margin-right: 4px;"></i>
                                Quel rythme souhaites-tu ?
                            </label>
                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-md);">
                                <div class="goal-btn pace-btn active" data-pace="gentle" onclick="selectPace('gentle')">
                                    <div class="goal-title"><i data-lucide="smile" style="width: 18px; height: 18px; display: inline-block; vertical-align: middle; margin-right: 6px;"></i>Doux</div>
                                    <div class="goal-desc">Facile à tenir</div>
                                </div>
                                <div class="goal-btn pace-btn" data-pace="normal" onclick="selectPace('normal')">
                                    <div class="goal-title"><i data-lucide="arrow-right" style="width: 18px; height: 18px; display: inline-block; vertical-align: middle; margin-right: 6px;"></i>Normal</div>
                                    <div class="goal-desc">Équilibré</div>
                                </div>
                                <div class="goal-btn pace-btn" data-pace="fast" onclick="selectPace('fast')">
                                    <div class="goal-title"><i data-lucide="zap" style="width: 18px; height: 18px; display: inline-block; vertical-align: middle; margin-right: 6px;"></i>Rapide</div>
                                    <div class="goal-desc">Plus exigeant</div>
                                </div>
                            </div>
                        </div>

                        <!-- Preview des paramètres automatiques -->
                        <div id="guided-preview" style="margin-top: var(--space-lg); padding: var(--space-md); background: rgba(255, 255, 255, 0.02); border-radius: var(--radius-md); border: 1px solid rgba(255, 255, 255, 0.05);">
                            <div style="display: flex; align-items: center; gap: var(--space-xs); margin-bottom: var(--space-sm); color: var(--text-secondary); font-size: 0.85rem; font-weight: 600;">
                                <i data-lucide="lock" style="width: 14px; height: 14px;"></i>
                                Paramètres automatiques
                            </div>
                            <div style="display: grid; gap: var(--space-xs); font-size: 0.8rem;">
                                <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--space-xs) 0;">
                                    <span style="color: var(--text-secondary);">Déficit/Surplus</span>
                                    <span style="color: var(--text-primary); font-weight: 500;">Calculé automatiquement</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--space-xs) 0;">
                                    <span style="color: var(--text-secondary);">Protéines</span>
                                    <span style="color: var(--text-primary); font-weight: 500;">Optimisées pour ton objectif</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--space-xs) 0;">
                                    <span style="color: var(--text-secondary);">Lipides</span>
                                    <span style="color: var(--text-primary); font-weight: 500;">Ajustés selon ton poids</span>
                                </div>
                            </div>
                        </div>

                        <!-- Toggle vers mode avancé -->
                        <div style="text-align: center; padding-top: var(--space-md);">
                            <button onclick="toggleAdvancedMode()" style="background: transparent; border: none; color: var(--text-secondary); cursor: pointer; font-size: 0.85rem; display: inline-flex; align-items: center; gap: var(--space-xs); padding: var(--space-xs) var(--space-sm); border-radius: var(--radius-md); transition: all 0.3s;">
                                <i data-lucide="settings" style="width: 14px; height: 14px;"></i>
                                Afficher les paramètres avancés
                            </button>
                        </div>
                    </div>

                    <!-- MODE AVANCÉ (caché par défaut) -->
                    <div id="advanced-mode" style="display: none; margin-bottom: var(--space-2xl);">

                    <!-- Cut options -->
                    <div id="cut-options" style="display: grid; gap: var(--space-xl);">
                        <div class="input-group">
                            <label style="display: flex; align-items: center; gap: var(--space-xs); font-weight: 600; margin-bottom: var(--space-sm);">
                                <i data-lucide="trending-down" style="width: 16px; height: 16px; display: inline; vertical-align: middle;"></i> Déficit calorique (%)
                            </label>
                            <input type="number" id="deficit" placeholder="ex: 18" min="10" max="30" step="1" style="width: 100%; padding: 14px; font-size: 1rem; background: var(--bg-tertiary); border: 2px solid var(--bg-tertiary); border-radius: var(--radius-md); color: var(--text-primary); transition: all 0.3s;">
                            <p class="info-text" style="margin-top: var(--space-sm);">Recommandé : 15-25% • Minimum : 10%</p>
                        </div>

                        <div class="input-group">
                            <label style="display: flex; align-items: center; gap: var(--space-xs); font-weight: 600; margin-bottom: var(--space-sm);">
                                <i data-lucide="beef" style="width: 16px; height: 16px; display: inline; vertical-align: middle;"></i> Protéines (g/kg)
                            </label>
                            <input type="number" id="proteinCoeff" placeholder="ex: 2.0" step="0.1" min="1.5" max="2.2" style="width: 100%; padding: 14px; font-size: 1rem; background: var(--bg-tertiary); border: 2px solid var(--bg-tertiary); border-radius: var(--radius-md); color: var(--text-primary); transition: all 0.3s;">
                            <p class="info-text" style="margin-top: var(--space-sm);">Recommandé : 1.8-2.2 g/kg • Minimum : 1.5 g/kg</p>
                        </div>

                        <div class="input-group">
                            <label style="display: flex; align-items: center; gap: var(--space-xs); font-weight: 600; margin-bottom: var(--space-sm);">
                                <i data-lucide="droplet" style="width: 16px; height: 16px; display: inline; vertical-align: middle;"></i> Lipides (g/kg)
                            </label>
                            <input type="number" id="fatCoeff" placeholder="ex: 0.9" step="0.1" min="0.6" max="1.5" oninput="checkFatWarning(this.value, 'cut')" style="width: 100%; padding: 14px; font-size: 1rem; background: var(--bg-tertiary); border: 2px solid var(--bg-tertiary); border-radius: var(--radius-md); color: var(--text-primary); transition: all 0.3s;">
                            <p class="info-text" style="margin-top: var(--space-sm);">Recommandé : 0.8-1.0 g/kg • Minimum : 0.6 g/kg</p>
                            <div id="fat-warning-cut" style="display: none; margin-top: var(--space-md); padding: var(--space-md); background: rgba(255, 230, 109, 0.1); border-left: 3px solid var(--accent-fat); border-radius: var(--radius-sm);">
                                <div style="font-weight: 600; color: var(--accent-fat); font-size: 0.9rem; margin-bottom: var(--space-xs);"><i data-lucide="alert-triangle" class="icon-inline"></i> Attention</div>
                                <div style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5;">Valeur élevée : peut réduire les glucides et impacter la performance.</div></div></div>

                        <!-- Info box lipides - Accordéon -->
                        <div class="info-accordion" onclick="this.classList.toggle('open')">
                            <div class="info-accordion-header">
                                <div class="info-accordion-title">
                                    <span>ℹ️</span>
                                    <span>À propos des lipides</span>
                                </div>
                                <i data-lucide="chevron-down" class="info-accordion-chevron" style="width: 18px; height: 18px;"></i>
                            </div>
                            <div class="info-accordion-content">
                                <p>Les lipides sont essentiels à la santé hormonale, mais consomment beaucoup de calories. Des valeurs trop élevées peuvent réduire les glucides disponibles et impacter la performance. À l'inverse, une consommation trop faible peut entraîner fatigue et baisse hormonale.</p>
                                <p style="margin-top: var(--space-md);"><strong style="color: var(--text-primary);"><i data-lucide="lightbulb" class="icon-inline"></i> Recommandations</strong><br>
                                Les valeurs proposées (0.8-1.0 g/kg) sont adaptées à la majorité des personnes actives et peuvent être ajustées selon ta réponse individuelle.</p>
                            </div>
                        </div></div>

                    <!-- Maintain options -->
                    <div id="maintain-options" style="display: none;">
                        <div style="padding: var(--space-xl); background: rgba(16, 185, 129, 0.08); border-radius: var(--radius-lg); border: 1px solid rgba(16, 185, 129, 0.2); margin-bottom: var(--space-xl);">
                            <div style="display: flex; align-items: center; gap: var(--space-md); margin-bottom: var(--space-md);">
                                <i data-lucide="equal" style="width: 24px; height: 24px; color: var(--accent-main);"></i>
                                <div style="font-weight: 600; color: var(--text-primary);">Mode Maintien</div>
                            </div>
                            <div style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
                                Tes calories correspondent à ce que ton corps dépense réellement. Ni déficit ni surplus : tu gardes ton poids stable.
                            </div>
                        </div>

                        <div style="display: grid; gap: var(--space-xl);">
                            <div class="input-group">
                                <label style="display: flex; align-items: center; gap: var(--space-xs); font-weight: 600; margin-bottom: var(--space-sm);">
                                    <i data-lucide="beef" style="width: 16px; height: 16px; display: inline; vertical-align: middle;"></i> Protéines (g/kg)
                                </label>
                                <input type="number" id="proteinCoeffMaintain" placeholder="ex: 1.8" step="0.1" min="1.5" max="2.2" style="width: 100%; padding: 14px; font-size: 1rem; background: var(--bg-tertiary); border: 2px solid var(--bg-tertiary); border-radius: var(--radius-md); color: var(--text-primary); transition: all 0.3s;">
                                <p class="info-text" style="margin-top: var(--space-sm);">Recommandé : 1.6-2.0 g/kg pour le maintien</p>
                            </div>

                            <div class="input-group">
                                <label style="display: flex; align-items: center; gap: var(--space-xs); font-weight: 600; margin-bottom: var(--space-sm);">
                                    <i data-lucide="droplet" style="width: 16px; height: 16px; display: inline; vertical-align: middle;"></i> Lipides (g/kg)
                                </label>
                                <input type="number" id="fatCoeffMaintain" placeholder="ex: 1.0" step="0.1" min="0.6" max="1.5" oninput="checkFatWarning(this.value, 'maintain')" style="width: 100%; padding: 14px; font-size: 1rem; background: var(--bg-tertiary); border: 2px solid var(--bg-tertiary); border-radius: var(--radius-md); color: var(--text-primary); transition: all 0.3s;">
                                <p class="info-text" style="margin-top: var(--space-sm);">Recommandé : 0.8-1.2 g/kg pour le maintien</p>
                                <div id="fat-warning-maintain" style="display: none; margin-top: var(--space-md); padding: var(--space-md); background: rgba(255, 230, 109, 0.1); border-left: 3px solid var(--accent-fat); border-radius: var(--radius-sm);">
                                    <div style="font-weight: 600; color: var(--accent-fat); font-size: 0.9rem; margin-bottom: var(--space-xs);"><i data-lucide="alert-triangle" class="icon-inline"></i> Attention</div>
                                    <div style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5;">Valeur élevée : peut réduire les glucides disponibles.</div></div>
                            </div>
                        </div>
                    </div>

                    <!-- Bulk options -->
                    <div id="bulk-options" style="display: none;">
                        <div style="display: grid; gap: var(--space-xl);">
                            <div class="input-group">
                                <label style="display: flex; align-items: center; gap: var(--space-xs); font-weight: 600; margin-bottom: var(--space-sm);">
                                    <i data-lucide="trending-up" style="width: 18px; height: 18px; color: var(--accent-main);"></i> Surplus calorique (%)
                                </label>
                                <input type="number" id="surplus" placeholder="ex: 8" min="5" max="15" step="1" style="width: 100%; padding: 14px; font-size: 1rem; background: var(--bg-tertiary); border: 2px solid var(--bg-tertiary); border-radius: var(--radius-md); color: var(--text-primary); transition: all 0.3s;">
                                <p class="info-text" style="margin-top: var(--space-sm);">Recommandé : 5-10% • Minimum : 5%</p>
                            </div>

                            <div class="input-group">
                                <label style="display: flex; align-items: center; gap: var(--space-xs); font-weight: 600; margin-bottom: var(--space-sm);">
                                    <i data-lucide="beef" style="width: 16px; height: 16px; display: inline; vertical-align: middle;"></i> Protéines (g/kg)
                                </label>
                                <input type="number" id="proteinCoeffBulk" placeholder="ex: 2.0" step="0.1" min="1.5" max="2.2" style="width: 100%; padding: 14px; font-size: 1rem; background: var(--bg-tertiary); border: 2px solid var(--bg-tertiary); border-radius: var(--radius-md); color: var(--text-primary); transition: all 0.3s;">
                                <p class="info-text" style="margin-top: var(--space-sm);">Recommandé : 1.8-2.2 g/kg • Minimum : 1.5 g/kg</p>
                            </div>

                            <div class="input-group">
                                <label style="display: flex; align-items: center; gap: var(--space-xs); font-weight: 600; margin-bottom: var(--space-sm);">
                                    <i data-lucide="droplet" style="width: 16px; height: 16px; display: inline; vertical-align: middle;"></i> Lipides (g/kg)
                                </label>
                                <input type="number" id="fatCoeffBulk" placeholder="ex: 0.9" step="0.1" min="0.6" max="1.5" oninput="checkFatWarning(this.value, 'bulk')" style="width: 100%; padding: 14px; font-size: 1rem; background: var(--bg-tertiary); border: 2px solid var(--bg-tertiary); border-radius: var(--radius-md); color: var(--text-primary); transition: all 0.3s;">
                                <p class="info-text" style="margin-top: var(--space-sm);">Recommandé : 0.8-1.0 g/kg • Minimum : 0.6 g/kg</p>
                                <div id="fat-warning-bulk" style="display: none; margin-top: var(--space-md); padding: var(--space-md); background: rgba(255, 230, 109, 0.1); border-left: 3px solid var(--accent-fat); border-radius: var(--radius-sm);">
                                    <div style="font-weight: 600; color: var(--accent-fat); font-size: 0.9rem; margin-bottom: var(--space-xs);"><i data-lucide="alert-triangle" class="icon-inline"></i> Attention</div>
                                    <div style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5;">Valeur élevée : peut réduire les glucides et impacter la performance.</div></div></div>

                            <!-- Info box lipides - Accordéon -->
                            <div class="info-accordion" onclick="this.classList.toggle('open')">
                                <div class="info-accordion-header">
                                    <div class="info-accordion-title">
                                        <span>ℹ️</span>
                                        <span>À propos des lipides</span>
                                    </div>
                                    <i data-lucide="chevron-down" class="info-accordion-chevron" style="width: 18px; height: 18px;"></i>
                                </div>
                                <div class="info-accordion-content">
                                    <p>Les lipides sont essentiels à la santé hormonale, mais consomment beaucoup de calories. Des valeurs trop élevées peuvent réduire les glucides disponibles et impacter la performance. À l'inverse, une consommation trop faible peut entraîner fatigue et baisse hormonale.</p>
                                    <p style="margin-top: var(--space-md);"><strong style="color: var(--text-primary);"><i data-lucide="lightbulb" class="icon-inline"></i> Recommandations</strong><br>
                                    Les valeurs proposées (0.8-1.0 g/kg) sont adaptées à la majorité des personnes actives et peuvent être ajustées selon ta réponse individuelle.</p>
                                </div>
                            </div></div></div>

                        <!-- Toggle retour mode guidé -->
                        <div style="text-align: center; padding-top: var(--space-md); margin-top: var(--space-xl); border-top: 1px solid rgba(255, 255, 255, 0.05);">
                            <button onclick="toggleAdvancedMode()" style="background: transparent; border: none; color: var(--text-secondary); cursor: pointer; font-size: 0.85rem; display: inline-flex; align-items: center; gap: var(--space-xs); padding: var(--space-xs) var(--space-sm); border-radius: var(--radius-md); transition: all 0.3s;">
                                <i data-lucide="arrow-left" style="width: 14px; height: 14px;"></i>
                                Retour au mode guidé
                            </button>
                        </div>
                    </div>
                    <!-- Fin MODE AVANCÉ -->
                </div></div>

            <!-- Warning box for macro validation -->
            <div id="macro-warning" style="display: none; margin-bottom: var(--space-2xl); padding: var(--space-xl); background: rgba(239, 68, 68, 0.1); border-left: 4px solid var(--accent-danger); border-radius: var(--radius-lg); box-shadow: 0 2px 8px rgba(239, 68, 68, 0.2);">
            </div>

            <!-- CALCULATE BUTTON -->
            <div style="display: flex; justify-content: center; margin-bottom: var(--space-3xl); margin-top: var(--space-lg);">
                <button id="calculate-btn" class="btn" onclick="calculateMacros()" style="background: var(--accent-ui); color: white; padding: var(--space-lg) var(--space-2xl); font-size: 1.1rem; font-weight: 700; border: none; box-shadow: var(--shadow-md); transition: all 0.3s; display: flex; align-items: center; gap: var(--space-sm);">
                    <i data-lucide="calculator" style="width: 22px; height: 22px;"></i>
                    Calculer mes Macros
                </button>
            </div>

            <div class="card" id="results" style="display: none;">
                <h2 style="font-size: 1.3rem; font-weight: 700; margin-bottom: var(--space-md); color: var(--text-primary);"><i data-lucide="bar-chart-3" style="width: 28px; height: 28px; color: var(--accent-ui);"></i>Tes Résultats</h2>

                <!-- Message état vide -->
                <div id="results-empty-state" style="text-align: center; padding: var(--space-2xl); color: var(--text-secondary); font-size: 0.95rem;">
                    <i data-lucide="calculator" style="width: 48px; height: 48px; opacity: 0.3; margin-bottom: var(--space-md);"></i>
                    <p>Renseigne ton profil puis clique <strong style="color: var(--accent-main);">"Calculer mes Macros"</strong></p>
                </div>

                <!-- Contenu des résultats (caché par défaut jusqu'au calcul) -->
                <div id="results-content" style="display: none;">
                    <!-- BMR, TDEE et IMC -->
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-lg); margin-bottom: var(--space-3xl); padding: var(--space-xl); background: var(--bg-tertiary); border-radius: var(--radius-md); border-left: 3px solid var(--accent-main);">
                        <div>
                            <div style="font-size: 0.85rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 1px; margin-bottom: var(--space-xs);">Métabolisme de base (BMR)</div>
                            <div style="font-size: 1.5rem; font-weight: 700; color: var(--text-primary);" id="bmr-display">— kcal</div>
                            <div style="font-size: 0.9rem; color: var(--text-secondary); margin-top: var(--space-xs);">Ce que tu brûles au repos</div></div>
                        <div>
                            <div style="font-size: 0.85rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 1px; margin-bottom: var(--space-xs);">Dépense journalière (TDEE)</div>
                            <div style="font-size: 1.5rem; font-weight: 700; color: var(--accent-main);" id="tdee-display">— kcal</div>
                            <div style="font-size: 0.9rem; color: var(--text-secondary); margin-top: var(--space-xs);">Ce que tu dépenses vraiment</div></div>
                        <div style="position: relative;">
                            <div style="font-size: 0.85rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 1px; margin-bottom: var(--space-xs);">IMC (Indice de Masse Corporelle)</div>

                            <!-- IMC toujours visible -->
                            <div style="position: relative; min-height: 60px;">
                                <div style="font-size: 1.5rem; font-weight: 700;" id="imc-display-blur">—</div>
                                <div style="font-size: 0.9rem; margin-top: var(--space-xs);" id="imc-category-blur">—</div>
                            </div></div></div>

                    <h3 style="margin-bottom: var(--space-xl); font-size: 1.2rem;">Tes Objectifs Macros :</h3>

                    <div class="grid-3">
                        <div class="macro-display">
                            <div class="macro-label">Protéines</div>
                            <div class="macro-value protein" id="targetProtein">—</div>
                            <div class="macro-unit">grammes</div>
                            <div class="progress-bar">
                                <div class="progress-fill protein" id="proteinBar" style="width: 0%"></div></div></div>

                        <div class="macro-display">
                            <div class="macro-label">Glucides</div>
                            <div class="macro-value carbs" id="targetCarbs">—</div>
                            <div class="macro-unit">grammes</div>
                            <div class="progress-bar">
                                <div class="progress-fill carbs" id="carbsBar" style="width: 0%"></div></div></div>

                        <div class="macro-display">
                            <div class="macro-label">Lipides</div>
                            <div class="macro-value fat" id="targetFat">—</div>
                            <div class="macro-unit">grammes</div>
                            <div class="progress-bar">
                                <div class="progress-fill fat" id="fatBar" style="width: 0%"></div></div></div></div>

                    <div class="summary-grid">
                        <div class="summary-card protein-card">
                            <div class="summary-label">Protéines</div>
                            <div class="summary-value" id="proteinCal">—</div>
                            <div class="summary-label">kcal</div></div>
                        <div class="summary-card carbs-card">
                            <div class="summary-label">Glucides</div>
                            <div class="summary-value" id="carbsCal">—</div>
                            <div class="summary-label">kcal</div></div>
                        <div class="summary-card fat-card">
                            <div class="summary-label">Lipides</div>
                            <div class="summary-value" id="fatCal">—</div>
                            <div class="summary-label">kcal</div></div>
                        <div class="summary-card total-card">
                            <div class="summary-label">Total</div>
                            <div class="summary-value" id="totalCal">—</div>
                            <div class="summary-label">kcal / jour</div></div></div>

                    <!-- CTA après calcul -->
                    <div style="margin-top: var(--space-3xl); padding: var(--space-2xl); background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%); border: 2px solid var(--accent-main); border-radius: var(--radius-lg);">
                        <h3 style="font-size: 1.3rem; font-weight: 700; color: var(--text-primary); margin-bottom: var(--space-xl); display: flex; align-items: center; gap: var(--space-md);">
                            <i data-lucide="rocket" style="width: 20px; height: 20px; display: inline-block; vertical-align: middle; margin-right: 8px;"></i>Et maintenant ?
                        </h3>

                        <div style="display: flex; gap: var(--space-lg); margin-bottom: var(--space-xl); flex-wrap: wrap;">
                            <button class="btn" onclick="exportMacrosAsImage()" style="flex: 1; min-width: 200px; display: flex; align-items: center; justify-content: center; gap: var(--space-sm);">
                                <i data-lucide="camera" style="width: 18px; height: 18px;"></i> Télécharger en image
                            </button>
                            <button class="btn" onclick="document.querySelector('[data-tab=&quot;meals&quot;]').click(); window.scrollTo({top: 0, behavior: 'smooth'});" style="flex: 1; min-width: 200px; background: var(--accent-purple); display: flex; align-items: center; justify-content: center; gap: var(--space-sm);">
                                <i data-lucide="calendar" style="width: 18px; height: 18px;"></i> Aller à Mes Repas
                            </button>
                        </div>

                        <div style="padding: var(--space-lg); background: rgba(0, 0, 0, 0.2); border-radius: var(--radius-md); border-left: 3px solid var(--accent-main);">
                            <p style="margin: 0; color: var(--text-primary); font-size: 0.95rem; line-height: 1.7;">
                                <div style="display: flex; align-items: start; gap: var(--space-xs);"><i data-lucide="alert-circle" style="width: 18px; height: 18px; color: var(--accent-ui); flex-shrink: 0; margin-top: 3px;"></i><div><strong>Bon à savoir :</strong> Ces valeurs sont un point de départ. Suis-les pendant <strong>10-14 jours</strong>, puis ajuste selon ton ressenti : énergie, humeur, résultats sur la balance. Ton corps te donnera les meilleurs indices.</div></div>
                            </p>
                        </div></div>
                </div><!-- Fin #results-content -->
            </div></div>

        <!-- Meals Tab -->
        <div id="meals" class="tab-content">
            <!-- Hero Header -->
            <div style="background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%); border-radius: var(--radius-xl); padding: var(--space-3xl); margin-bottom: var(--space-3xl); border: 1px solid rgba(255, 255, 255, 0.05); box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);">
                <div style="display: flex; align-items: center; gap: var(--space-lg); margin-bottom: var(--space-lg);">
                    <div style="font-size: 3rem; display: flex; align-items: center; justify-content: center; width: 60px; height: 60px; background: var(--accent-ui); border-radius: var(--radius-lg);"><i data-lucide="utensils-crossed" style="width: 36px; height: 36px; color: white;"></i></div>
                    <div>
                        <h1 style="font-size: 2rem; font-weight: 700; margin: 0; color: var(--accent-ui);">
                            Mes Repas
                        </h1>
                        <p style="margin: 0; margin-top: var(--space-xs); color: var(--text-secondary); font-size: 1rem;">
                            Note ce que tu manges et visualise tes macros en temps réel
                        </p>
                    </div></div></div>

            <!-- Navigation de date -->
            <div class="date-navigation-wrapper">
                <!-- Ligne 1: Titre de la journée -->
                <h2 class="date-navigation-title"><i data-lucide="calendar" style="width: 22px; height: 22px;"></i><span>Journée du <span id="meal-header-date"></span></span></h2>

                <!-- Ligne 2: Navigation -->
                <div class="date-navigation-controls">
                    <button class="date-nav-btn" onclick="changeMealDate(-1)" title="Jour précédent">
                        <i data-lucide="chevron-left" style="width: 20px; height: 20px;"></i>
                    </button>
                    <div class="date-navigation-center">
                        <div class="current-date" id="meal-current-date">
                            <span id="meal-date-text">Aujourd'hui</span>
                        </div>
                        <span id="closed-day-badge" style="display: none; margin-top: 4px; padding: 3px 10px; background: var(--accent-main); border-radius: var(--radius-sm); font-size: 0.85rem; font-weight: 700;"><i data-lucide="lock" style="width: 14px; height: 14px;"></i> Clôturée</span>
                    </div>
                    <button class="date-nav-btn" onclick="changeMealDate(1)" title="Jour suivant">
                        <i data-lucide="chevron-right" style="width: 20px; height: 20px;"></i>
                    </button>
                    <button class="date-nav-btn date-today-btn" onclick="goToToday()" title="Retour à aujourd'hui">
                        <i data-lucide="calendar-check" style="width: 18px; height: 18px;"></i>
                        <span class="today-btn-text">Aujourd'hui</span>
                    </button>
                    <!-- Premium: Bouton Copier hier -->
                    <button class="copy-yesterday-btn" onclick="copyYesterdayMeals()" title="Copier les repas d'hier">
                        <i data-lucide="copy" style="width: 16px; height: 16px;"></i>
                        <span>Copier hier</span>
                    </button>
                    <!-- Bouton Export -->
                    <button class="copy-yesterday-btn" onclick="exportDayAsImage()" title="Exporter la journée" style="background: var(--accent-carbs); border-color: var(--accent-carbs);">
                        <i data-lucide="download" style="width: 16px; height: 16px;"></i>
                        <span>Exporter</span>
                    </button>
                </div>
            </div>

            <!-- Widget "Reste du jour" -->
            <div id="remaining-widget" style="background: var(--bg-tertiary); border-radius: var(--radius-xl); padding: var(--space-xl); margin-bottom: var(--space-2xl); border: 1px solid rgba(16, 185, 129, 0.2); display: none;">
                <div style="display: flex; align-items: center; justify-content: space-between; gap: var(--space-xl); flex-wrap: wrap;">
                    <div style="display: flex; align-items: center; gap: var(--space-md);">
                        <div style="display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; background: var(--accent-ui); border-radius: var(--radius-md);"><i data-lucide="target" style="width: 24px; height: 24px; color: white;"></i></div>
                        <div>
                            <div style="font-size: 0.9rem; font-weight: 600; color: var(--text-primary); margin-bottom: var(--space-xs);">Il te reste</div>
                            <div style="font-size: 0.85rem; color: var(--text-secondary);">Pour atteindre tes objectifs du jour</div></div></div>
                    <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: var(--space-lg); flex: 1; max-width: 650px;">
                        <!-- Premium: Macros cliquables -->
                        <div class="remaining-macro-clickable" onclick="scrollToNextEmptyMeal()" style="text-align: center;" title="Cliquer pour ajouter des protéines">
                            <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: var(--space-xs);">Protéines</div>
                            <div style="font-size: 1.3rem; font-weight: 700; color: var(--accent-protein);" id="remaining-protein">0g</div></div>
                        <div class="remaining-macro-clickable" onclick="scrollToNextEmptyMeal()" style="text-align: center;" title="Cliquer pour ajouter des glucides">
                            <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: var(--space-xs);">Glucides</div>
                            <div style="font-size: 1.3rem; font-weight: 700; color: var(--accent-carbs);" id="remaining-carbs">0g</div></div>
                        <div class="remaining-macro-clickable" onclick="scrollToNextEmptyMeal()" style="text-align: center;" title="Cliquer pour ajouter des lipides">
                            <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: var(--space-xs);">Lipides</div>
                            <div style="font-size: 1.3rem; font-weight: 700; color: var(--accent-fat);" id="remaining-fat">0g</div></div>
                        <div class="remaining-macro-clickable" onclick="scrollToNextEmptyMeal()" style="text-align: center;" title="Cliquer pour ajouter des calories">
                            <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: var(--space-xs);">Calories</div>
                            <div style="font-size: 1.3rem; font-weight: 700; color: var(--text-primary);" id="remaining-cal">0 kcal</div></div>
                        <div style="text-align: center; border-left: 1px solid rgba(255,255,255,0.1); padding-left: var(--space-lg);">
                            <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: var(--space-xs);"><i data-lucide="droplets" style="width: 12px; height: 12px; display: inline; vertical-align: middle;"></i> Eau</div>
                            <div style="display: flex; align-items: center; justify-content: center; gap: var(--space-xs);">
                                <button onclick="updateWater(-1)" class="btn-ghost" style="width: 24px; height: 24px; padding: 0; border-radius: 50%; font-size: 1rem;">−</button>
                                <div style="font-size: 1.3rem; font-weight: 700; color: var(--accent-ui);" id="water-count">0</div>
                                <button onclick="updateWater(1)" class="btn" style="width: 24px; height: 24px; padding: 0; border-radius: 50%; background: var(--accent-ui); font-size: 1rem;">+</button>
                            </div>
                            <div style="font-size: 0.7rem; color: var(--text-secondary); margin-top: 2px;"><span id="water-ml">0</span>/<span id="water-target">2000</span>ml</div></div></div></div>
            </div>

            <!-- Grid 2x2 des repas -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-xl); margin-bottom: var(--space-2xl);">

                <!-- Petit-déjeuner -->
                <div class="meal-card">
                    <div class="meal-card-header">
                        <div style="display: flex; align-items: center; gap: var(--space-sm);">
                            <i data-lucide="coffee" style="width: 22px; height: 22px; color: var(--accent-fat);"></i>
                            <span style="font-weight: 700; font-size: 1.1rem;">Petit-déjeuner</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: var(--space-md);">
                            <div style="font-weight: 700; color: var(--accent-ui);" id="breakfast-total">0 kcal</div>
                            <!-- Premium: Menu ⋯ -->
                            <div class="meal-menu-container">
                                <button class="meal-menu-btn" onclick="toggleMealMenu('breakfast')" title="Options du repas">⋯</button>
                                <div class="meal-menu-dropdown" id="meal-menu-breakfast">
                                    <div class="meal-menu-item" onclick="copyMealTo('breakfast')"><i data-lucide="copy" style="width: 16px; height: 16px;"></i> Copier vers...</div>
                                    <div class="meal-menu-item danger" onclick="clearMeal('breakfast'); closeMealMenus()"><i data-lucide="trash-2" style="width: 16px; height: 16px;"></i> Vider</div>
                                </div>
                            </div>
                        </div></div>
                    <div class="food-list" id="breakfast-foods"></div>
                    <div id="breakfast-recipe" style="display: none; margin-top: var(--space-sm); padding: var(--space-md); background: var(--bg-tertiary); border-radius: var(--radius-md);">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-sm);">
                            <div style="font-size: 0.85rem; color: var(--accent-carbs); font-weight: 600;"><i data-lucide="book-open" style="width: 16px; height: 16px; display: inline; vertical-align: middle;"></i> Recette / Lien</div>
                            <button onclick="document.getElementById('breakfast-recipe').style.display='none'" style="background: none; border: none; color: var(--text-secondary); cursor: pointer; font-size: 1.2rem; padding: 0;" title="Masquer">×</button>
                        </div>
                        <textarea id="breakfast-recipe-input"
                                  placeholder="URL d'une recette, instructions, notes..."
                                  style="width: 100%; min-height: 80px; padding: var(--space-sm); background: var(--bg-primary); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-sm); color: var(--text-primary); font-size: 0.9rem; resize: vertical; font-family: inherit;"
                                  oninput="saveRecipe('breakfast', this.value)"></textarea>
                    </div>

                    <!-- Quick Add -->
                    <div style="margin-top: var(--space-sm); position: relative;">
                        <input type="text"
                               id="quick-add-breakfast"
                               placeholder="⚡ Quick Add - Tape le nom de l'aliment..."
                               autocomplete="off"
                               oninput="handleQuickAddSearch('breakfast', this.value)"
                               style="width: 100%; padding: var(--space-md); font-size: 0.95rem; background: var(--bg-tertiary); border: 2px solid transparent; border-radius: var(--radius-md); color: var(--text-primary); transition: var(--transition-normal);">
                        <div id="quick-results-breakfast" class="quick-add-results" style="display: none;"></div></div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: var(--space-sm); margin-top: var(--space-md); margin-bottom: 0;">
                       <button class="add-food-btn" onclick="openMealTemplatesModal('breakfast')" style="border: 2px solid var(--accent-carbs); color: var(--accent-carbs);">
                                Charger un repas type
                            </button>
                      <button class="add-food-btn" onclick="saveMealAsTemplate('breakfast')" style="border: 2px solid var(--accent-main); color: var(--accent-main);">
                                Enregistrer comme repas type
                            </button>
                       <button class="add-food-btn" onclick="const div = document.getElementById('breakfast-recipe'); if(div.style.display === 'none') { div.style.display = 'block'; document.getElementById('breakfast-recipe-input').focus(); } else { div.style.display = 'none'; }" style="border: 2px solid var(--accent-carbs); color: var(--accent-carbs);">
                                <i data-lucide="book-open" style="width: 16px; height: 16px; display: inline; vertical-align: middle;"></i> Recette
                            </button>
                    </div></div>

                <!-- Déjeuner -->
                <div class="meal-card">
                    <div class="meal-card-header">
                        <div style="display: flex; align-items: center; gap: var(--space-sm);">
                            <i data-lucide="utensils" style="width: 22px; height: 22px; color: var(--accent-carbs);"></i>
                            <span style="font-weight: 700; font-size: 1.1rem;">Déjeuner</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: var(--space-md);">
                            <div style="font-weight: 700; color: var(--accent-ui);" id="lunch-total">0 kcal</div>
                            <!-- Premium: Menu ⋯ -->
                            <div class="meal-menu-container">
                                <button class="meal-menu-btn" onclick="toggleMealMenu('lunch')" title="Options du repas">⋯</button>
                                <div class="meal-menu-dropdown" id="meal-menu-lunch">
                                    <div class="meal-menu-item" onclick="copyMealTo('lunch')"><i data-lucide="copy" style="width: 16px; height: 16px;"></i> Copier vers...</div>
                                    <div class="meal-menu-item danger" onclick="clearMeal('lunch'); closeMealMenus()"><i data-lucide="trash-2" style="width: 16px; height: 16px;"></i> Vider</div>
                                </div>
                            </div>
                        </div></div>
                    <div class="food-list" id="lunch-foods"></div>
                    <div id="lunch-recipe" style="display: none; margin-top: var(--space-sm); padding: var(--space-md); background: var(--bg-tertiary); border-radius: var(--radius-md);">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-sm);">
                            <div style="font-size: 0.85rem; color: var(--accent-carbs); font-weight: 600;"><i data-lucide="book-open" style="width: 16px; height: 16px; display: inline; vertical-align: middle;"></i> Recette / Lien</div>
                            <button onclick="document.getElementById('lunch-recipe').style.display='none'" style="background: none; border: none; color: var(--text-secondary); cursor: pointer; font-size: 1.2rem; padding: 0;" title="Masquer">×</button>
                        </div>
                        <textarea id="lunch-recipe-input"
                                  placeholder="URL d'une recette, instructions, notes..."
                                  style="width: 100%; min-height: 80px; padding: var(--space-sm); background: var(--bg-primary); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-sm); color: var(--text-primary); font-size: 0.9rem; resize: vertical; font-family: inherit;"
                                  oninput="saveRecipe('lunch', this.value)"></textarea>
                    </div>

                    <!-- Quick Add -->
                    <div style="margin-top: var(--space-sm); position: relative;">
                        <input type="text"
                               id="quick-add-lunch"
                               placeholder="⚡ Quick Add - Tape le nom de l'aliment..."
                               autocomplete="off"
                               oninput="handleQuickAddSearch('lunch', this.value)"
                               style="width: 100%; padding: var(--space-md); font-size: 0.95rem; background: var(--bg-tertiary); border: 2px solid transparent; border-radius: var(--radius-md); color: var(--text-primary); transition: var(--transition-normal);">
                        <div id="quick-results-lunch" class="quick-add-results" style="display: none;"></div></div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: var(--space-sm); margin-top: var(--space-md); margin-bottom: 0;">
                        <button class="add-food-btn" onclick="openMealTemplatesModal('lunch')" style="border: 2px solid var(--accent-carbs); color: var(--accent-carbs);">
                                Charger un repas type
                            </button>
                        <button class="add-food-btn" onclick="saveMealAsTemplate('lunch')" style="border: 2px solid var(--accent-main); color: var(--accent-main);">
                                Enregistrer comme repas type
                            </button>
                       <button class="add-food-btn" onclick="const div = document.getElementById('lunch-recipe'); if(div.style.display === 'none') { div.style.display = 'block'; document.getElementById('lunch-recipe-input').focus(); } else { div.style.display = 'none'; }" style="border: 2px solid var(--accent-carbs); color: var(--accent-carbs);">
                                <i data-lucide="book-open" style="width: 16px; height: 16px; display: inline; vertical-align: middle;"></i> Recette
                            </button>
                    </div></div>

                <!-- Goûter -->
                <div class="meal-card">
                    <div class="meal-card-header">
                        <div style="display: flex; align-items: center; gap: var(--space-sm);">
                            <i data-lucide="apple" style="width: 24px; height: 24px; color: var(--accent-ui);"></i>
                            <span style="font-weight: 700; font-size: 1.1rem;">Goûter</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: var(--space-md);">
                            <div style="font-weight: 700; color: var(--accent-ui);" id="snack-total">0 kcal</div>
                            <!-- Premium: Menu ⋯ -->
                            <div class="meal-menu-container">
                                <button class="meal-menu-btn" onclick="toggleMealMenu('snack')" title="Options du repas">⋯</button>
                                <div class="meal-menu-dropdown" id="meal-menu-snack">
                                    <div class="meal-menu-item" onclick="copyMealTo('snack')"><i data-lucide="copy" style="width: 16px; height: 16px;"></i> Copier vers...</div>
                                    <div class="meal-menu-item danger" onclick="clearMeal('snack'); closeMealMenus()"><i data-lucide="trash-2" style="width: 16px; height: 16px;"></i> Vider</div>
                                </div>
                            </div>
                        </div></div>
                    <div class="food-list" id="snack-foods"></div>
                    <div id="snack-recipe" style="display: none; margin-top: var(--space-sm); padding: var(--space-md); background: var(--bg-tertiary); border-radius: var(--radius-md);">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-sm);">
                            <div style="font-size: 0.85rem; color: var(--accent-carbs); font-weight: 600;"><i data-lucide="book-open" style="width: 16px; height: 16px; display: inline; vertical-align: middle;"></i> Recette / Lien</div>
                            <button onclick="document.getElementById('snack-recipe').style.display='none'" style="background: none; border: none; color: var(--text-secondary); cursor: pointer; font-size: 1.2rem; padding: 0;" title="Masquer">×</button>
                        </div>
                        <textarea id="snack-recipe-input"
                                  placeholder="URL d'une recette, instructions, notes..."
                                  style="width: 100%; min-height: 80px; padding: var(--space-sm); background: var(--bg-primary); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-sm); color: var(--text-primary); font-size: 0.9rem; resize: vertical; font-family: inherit;"
                                  oninput="saveRecipe('snack', this.value)"></textarea>
                    </div>

                    <!-- Quick Add -->
                    <div style="margin-top: var(--space-sm); position: relative;">
                        <input type="text"
                               id="quick-add-snack"
                               placeholder="⚡ Quick Add - Tape le nom de l'aliment..."
                               autocomplete="off"
                               oninput="handleQuickAddSearch('snack', this.value)"
                               style="width: 100%; padding: var(--space-md); font-size: 0.95rem; background: var(--bg-tertiary); border: 2px solid transparent; border-radius: var(--radius-md); color: var(--text-primary); transition: var(--transition-normal);">
                        <div id="quick-results-snack" class="quick-add-results" style="display: none;"></div></div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: var(--space-sm); margin-top: var(--space-md); margin-bottom: 0;">
                        <button class="add-food-btn" onclick="openMealTemplatesModal('snack')" style="border: 2px solid var(--accent-carbs); color: var(--accent-carbs);">
                                Charger un repas type
                            </button>
                        <button class="add-food-btn" onclick="saveMealAsTemplate('snack')" style="border: 2px solid var(--accent-main); color: var(--accent-main);">
                                Enregistrer comme repas type
                            </button>
                       <button class="add-food-btn" onclick="const div = document.getElementById('snack-recipe'); if(div.style.display === 'none') { div.style.display = 'block'; document.getElementById('snack-recipe-input').focus(); } else { div.style.display = 'none'; }" style="border: 2px solid var(--accent-carbs); color: var(--accent-carbs);">
                                <i data-lucide="book-open" style="width: 16px; height: 16px; display: inline; vertical-align: middle;"></i> Recette
                            </button>
                    </div></div>

                <!-- Dîner -->
                <div class="meal-card">
                    <div class="meal-card-header">
                        <div style="display: flex; align-items: center; gap: var(--space-sm);">
                            <i data-lucide="moon" style="width: 22px; height: 22px; color: var(--accent-purple);"></i>
                            <span style="font-weight: 700; font-size: 1.1rem;">Dîner</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: var(--space-md);">
                            <div style="font-weight: 700; color: var(--accent-ui);" id="dinner-total">0 kcal</div>
                            <!-- Premium: Menu ⋯ -->
                            <div class="meal-menu-container">
                                <button class="meal-menu-btn" onclick="toggleMealMenu('dinner')" title="Options du repas">⋯</button>
                                <div class="meal-menu-dropdown" id="meal-menu-dinner">
                                    <div class="meal-menu-item" onclick="copyMealTo('dinner')"><i data-lucide="copy" style="width: 16px; height: 16px;"></i> Copier vers...</div>
                                    <div class="meal-menu-item danger" onclick="clearMeal('dinner'); closeMealMenus()"><i data-lucide="trash-2" style="width: 16px; height: 16px;"></i> Vider</div>
                                </div>
                            </div>
                        </div></div>
                    <div class="food-list" id="dinner-foods"></div>
                    <div id="dinner-recipe" style="display: none; margin-top: var(--space-sm); padding: var(--space-md); background: var(--bg-tertiary); border-radius: var(--radius-md);">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-sm);">
                            <div style="font-size: 0.85rem; color: var(--accent-carbs); font-weight: 600;"><i data-lucide="book-open" style="width: 16px; height: 16px; display: inline; vertical-align: middle;"></i> Recette / Lien</div>
                            <button onclick="document.getElementById('dinner-recipe').style.display='none'" style="background: none; border: none; color: var(--text-secondary); cursor: pointer; font-size: 1.2rem; padding: 0;" title="Masquer">×</button>
                        </div>
                        <textarea id="dinner-recipe-input"
                                  placeholder="URL d'une recette, instructions, notes..."
                                  style="width: 100%; min-height: 80px; padding: var(--space-sm); background: var(--bg-primary); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-sm); color: var(--text-primary); font-size: 0.9rem; resize: vertical; font-family: inherit;"
                                  oninput="saveRecipe('dinner', this.value)"></textarea>
                    </div>

                    <!-- Quick Add -->
                    <div style="margin-top: var(--space-sm); position: relative;">
                        <input type="text"
                               id="quick-add-dinner"
                               placeholder="⚡ Quick Add - Tape le nom de l'aliment..."
                               autocomplete="off"
                               oninput="handleQuickAddSearch('dinner', this.value)"
                               style="width: 100%; padding: var(--space-md); font-size: 0.95rem; background: var(--bg-tertiary); border: 2px solid transparent; border-radius: var(--radius-md); color: var(--text-primary); transition: var(--transition-normal);">
                        <div id="quick-results-dinner" class="quick-add-results" style="display: none;"></div></div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: var(--space-sm); margin-top: var(--space-md); margin-bottom: 0;">
                        <button class="add-food-btn" onclick="openMealTemplatesModal('dinner')" style="border: 2px solid var(--accent-carbs); color: var(--accent-carbs);">
                                Charger un repas type
                            </button>
                        <button class="add-food-btn" onclick="saveMealAsTemplate('dinner')" style="border: 2px solid var(--accent-main); color: var(--accent-main);">
                                Enregistrer comme repas type
                            </button>
                       <button class="add-food-btn" onclick="const div = document.getElementById('dinner-recipe'); if(div.style.display === 'none') { div.style.display = 'block'; document.getElementById('dinner-recipe-input').focus(); } else { div.style.display = 'none'; }" style="border: 2px solid var(--accent-carbs); color: var(--accent-carbs);">
                                <i data-lucide="book-open" style="width: 16px; height: 16px; display: inline; vertical-align: middle;"></i> Recette
                            </button>
                    </div></div></div>

            <div class="card">

                <!-- Total de la journée -->
                <div class="day-totals">
                    <div class="day-totals-title">Total de la Journée</div>
                    <!-- Barres de progression vers objectifs -->
                    <div style="margin-bottom: 30px;">
                        <div style="margin-bottom: 15px;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                                <span style="color: var(--accent-protein); font-weight: 600;">Protéines</span>
                                <span id="day-protein-progress">0 / 0g</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill protein" id="day-protein-bar" style="width: 0%"></div></div></div>

                        <div style="margin-bottom: 15px;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                                <span style="color: var(--accent-carbs); font-weight: 600;">Glucides</span>
                                <span id="day-carbs-progress">0 / 0g</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill carbs" id="day-carbs-bar" style="width: 0%"></div></div></div>

                        <div style="margin-bottom: 15px;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                                <span style="color: var(--accent-fat); font-weight: 600;">Lipides</span>
                                <span id="day-fat-progress">0 / 0g</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill fat" id="day-fat-bar" style="width: 0%"></div></div></div>

                        <div style="margin-bottom: 15px;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                                <span style="color: var(--text-primary); font-weight: 600;">Calories</span>
                                <span id="day-cal-progress">0 / 0 kcal</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" id="day-cal-bar" style="width: 0%; background: rgba(255, 255, 255, 0.9);"></div></div></div></div>

                    <div class="summary-grid" style="grid-template-columns: repeat(5, 1fr);">
                        <div class="summary-card protein-card">
                            <div class="summary-label">Protéines</div>
                            <div class="summary-value" id="day-protein">0</div>
                            <div class="summary-label">g</div></div>
                        <div class="summary-card carbs-card">
                            <div class="summary-label">Glucides</div>
                            <div class="summary-value" id="day-carbs">0</div>
                            <div class="summary-label">g</div></div>
                        <div class="summary-card fat-card">
                            <div class="summary-label">Lipides</div>
                            <div class="summary-value" id="day-fat">0</div>
                            <div class="summary-label">g</div></div>
                        <div class="summary-card" style="background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2);">
                            <div class="summary-label" style="color: var(--text-secondary);">Fibres</div>
                            <div class="summary-value" id="day-fiber" style="color: var(--text-primary);">0</div>
                            <div class="summary-label">g</div></div>
                        <div class="summary-card total-card">
                            <div class="summary-label">Total</div>
                            <div class="summary-value" id="day-total">0</div>
                            <div class="summary-label">kcal</div></div></div>

                    <!-- Disclaimer macros -->
                    <div style="margin-top: var(--space-lg); padding: var(--space-lg); background: rgba(78, 205, 196, 0.1); border-left: 3px solid var(--accent-carbs); border-radius: var(--radius-sm); font-size: 1rem; color: var(--text-secondary); line-height: 1.6;">
                        <i data-lucide="lightbulb" class="icon-inline"></i> <strong>Bonne nouvelle :</strong> Pas besoin d'être parfait ! Glucides et lipides peuvent varier d'un jour à l'autre. Seules les protéines comptent vraiment chaque jour pour garder ton muscle.
                    </div>

                    <!-- Feedback émotionnel journalier -->
                    <div id="daily-feedback" style="margin-top: var(--space-2xl); padding: var(--space-2xl); border-radius: var(--radius-lg); text-align: center; font-weight: 600; display: none; animation: fadeIn 0.5s ease;">
                        <div style="font-size: 3rem; margin-bottom: var(--space-md);" id="feedback-emoji">🎯</div>
                        <div style="font-size: 1.2rem; line-height: 1.6;" id="feedback-message">Continue comme ça !</div></div>

                    <!-- Bouton Clôturer la journée -->
                    <div style="margin-top: var(--space-2xl); padding: var(--space-xl); background: rgba(16, 185, 129, 0.1); border: 2px solid var(--accent-main); border-radius: var(--radius-md);">
                        <div style="display: flex; align-items: center; gap: var(--space-md); margin-bottom: var(--space-md);">
                            <i data-lucide="lock" style="width: 32px; height: 32px; color: var(--accent-main);"></i>
                            <div style="flex: 1;">
                                <div style="font-weight: 600; font-size: 1.1rem; color: var(--text-primary); margin-bottom: var(--space-xs);">Journée terminée ?</div>
                                <div style="font-size: 0.85rem; color: var(--text-secondary);">Verrouille cette journée et ajoute-la à ton planning</div></div></div>
                        <button class="btn" id="close-day-btn" onclick="closeDayConfirm()" style="width: 100%;">
                            <i data-lucide="check-circle" style="width: 18px; height: 18px;"></i><span id="close-day-text">Clôturer cette journée</span>
                        </button>
                        <div id="day-closed-notice" style="display: none; margin-top: var(--space-md); padding: var(--space-md); background: rgba(16, 185, 129, 0.2); border-radius: var(--radius-sm); text-align: center; color: var(--accent-main); font-weight: 600;">
                            <i data-lucide="lock" style="width: 18px; height: 18px;"></i> C'est noté ! Journée ajoutée au planning
                        </div></div></div></div>
        </div>

        <!-- Weekly Planner Tab -->
        <div id="planner" class="tab-content">
            <!-- Hero Header -->
            <div style="background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%); border-radius: var(--radius-xl); padding: var(--space-3xl); margin-bottom: var(--space-3xl); border: 1px solid rgba(255, 255, 255, 0.05); box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);">
                <div style="display: flex; align-items: center; gap: var(--space-lg); margin-bottom: var(--space-lg);">
                    <div style="font-size: 3rem; display: flex; align-items: center; justify-content: center; width: 60px; height: 60px; background: var(--accent-ui); border-radius: var(--radius-lg);"><i data-lucide="calendar-days" style="width: 36px; height: 36px; color: white;"></i></div>
                    <div>
                        <h1 style="font-size: 2rem; font-weight: 700; margin: 0; color: var(--accent-ui);">
                            Planning Hebdomadaire
                        </h1>
                        <p style="margin: 0; margin-top: var(--space-xs); color: var(--text-secondary); font-size: 1rem;">
                            Garde une vue d'ensemble sur ta semaine
                        </p>
                    </div></div></div>

            <div class="card">
                <div class="week-selector">
                    <button class="week-nav-btn" onclick="changeWeek(-1)"><i data-lucide="chevron-left" style="width: 16px; height: 16px;"></i> Semaine préc.</button>
                    <div class="current-week" id="current-week">Semaine du 15 Déc 2025</div>
                    <button class="week-nav-btn" onclick="changeWeek(1)">Semaine suiv. <i data-lucide="chevron-right" style="width: 16px; height: 16px;"></i></button>
                </div>
                <div style="text-align: center; margin-bottom: var(--space-xl); display: flex; gap: var(--space-md); justify-content: center; align-items: center;">
                    <button class="week-nav-btn this-week-btn" onclick="goToCurrentWeek()" style="background: var(--accent-main); color: white; border-color: var(--accent-main);">
                        <i data-lucide="calendar-check" style="width: 16px; height: 16px;"></i> Cette semaine
                    </button>
                    <button class="week-nav-btn" onclick="showCalendarView()" style="background: var(--accent-ui); color: white; border-color: var(--accent-ui);">
                        <i data-lucide="calendar" style="width: 16px; height: 16px;"></i> Vue Calendrier
                    </button>
                </div>

                <!-- Résumé Hebdomadaire -->
                <div id="weekly-summary" style="background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%); border-radius: var(--radius-lg); padding: var(--space-xl); margin-bottom: var(--space-xl); border: 2px solid rgba(16, 185, 129, 0.2); box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);">
                    <div onclick="window.innerWidth <= 768 && toggleWeeklySummary()" style="display: flex; align-items: center; justify-content: space-between; gap: var(--space-md); padding-bottom: var(--space-md); border-bottom: 2px solid rgba(255, 255, 255, 0.1);">
                        <div style="display: flex; align-items: center; gap: var(--space-md);">
                            <i data-lucide="bar-chart-3" style="width: 28px; height: 28px; color: var(--accent-ui);"></i>
                            <h3 style="font-size: 1.3rem; font-weight: 700; margin: 0; color: var(--text-primary);">Résumé de la semaine</h3>
                        </div>
                        <i id="weekly-summary-toggle" data-lucide="chevron-down" style="width: 24px; height: 24px; color: var(--text-secondary); transition: transform 0.3s; display: none;"></i>
                    </div>
                    <div id="weekly-summary-content">
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-xl); margin-top: var(--space-xl);">
                        <!-- Calories moyennes -->
                        <div style="text-align: center; padding: var(--space-lg); background: rgba(16, 185, 129, 0.1); border-radius: var(--radius-md); border: 1px solid rgba(16, 185, 129, 0.2);">
                            <div style="display: flex; align-items: center; justify-content: center; gap: var(--space-sm); margin-bottom: var(--space-md);">
                                <i data-lucide="flame" style="width: 20px; height: 20px; color: var(--accent-main);"></i>
                                <div style="font-size: 0.9rem; font-weight: 600; color: var(--text-secondary);">Calories moy.</div>
                            </div>
                            <div id="weekly-avg-calories" style="font-size: 2rem; font-weight: 700; color: var(--accent-main);">—</div>
                            <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: var(--space-xs);">kcal / jour</div>
                        </div>

                        <!-- Jours clôturés -->
                        <div style="text-align: center; padding: var(--space-lg); background: rgba(91, 141, 217, 0.1); border-radius: var(--radius-md); border: 1px solid rgba(91, 141, 217, 0.2);">
                            <div style="display: flex; align-items: center; justify-content: center; gap: var(--space-sm); margin-bottom: var(--space-md);">
                                <i data-lucide="lock" style="width: 20px; height: 20px; color: var(--accent-carbs);"></i>
                                <div style="font-size: 0.9rem; font-weight: 600; color: var(--text-secondary);">Jours clôturés</div>
                            </div>
                            <div id="weekly-closed-days" style="font-size: 2rem; font-weight: 700; color: var(--accent-carbs);">—</div>
                            <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: var(--space-xs);">sur 7 jours</div>
                        </div>

                        <!-- % Objectifs macros -->
                        <div style="text-align: center; padding: var(--space-lg); background: rgba(212, 168, 71, 0.1); border-radius: var(--radius-md); border: 1px solid rgba(212, 168, 71, 0.2);">
                            <div style="display: flex; align-items: center; justify-content: center; gap: var(--space-sm); margin-bottom: var(--space-md);">
                                <i data-lucide="target" style="width: 20px; height: 20px; color: var(--accent-fat);"></i>
                                <div style="font-size: 0.9rem; font-weight: 600; color: var(--text-secondary);">Objectifs macros</div>
                            </div>
                            <div id="weekly-macro-success" style="font-size: 2rem; font-weight: 700; color: var(--accent-fat);">—</div>
                            <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: var(--space-xs);">% de respect</div>
                        </div>
                    </div>
                    </div>
                </div>

                <div class="week-grid" id="week-grid"></div></div></div>

        <!-- Foods Database Tab -->
        <div id="foods" class="tab-content">
            <!-- Hero Header -->
            <div style="background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%); border-radius: var(--radius-xl); padding: var(--space-3xl); margin-bottom: var(--space-3xl); border: 1px solid rgba(255, 255, 255, 0.05); box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);">
                <div style="display: flex; align-items: center; gap: var(--space-lg); margin-bottom: var(--space-lg);">
                    <div style="font-size: 3rem; display: flex; align-items: center; justify-content: center; width: 60px; height: 60px; background: var(--accent-ui); border-radius: var(--radius-lg);"><i data-lucide="apple" style="width: 36px; height: 36px; color: white;"></i></div>
                    <div>
                        <h1 style="font-size: 2rem; font-weight: 700; margin: 0; color: var(--accent-ui);">
                            Base d'Aliments
                        </h1>
                        <p style="margin: 0; margin-top: var(--space-xs); color: var(--text-secondary); font-size: 1rem;">
                            Cherche un aliment ou crée les tiens
                        </p>
                    </div></div></div>

            <div class="card">
                <div class="food-db-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: var(--space-md);">
                    <h2 style="font-size: 1.3rem; font-weight: 700; margin: 0; color: var(--text-primary); display: flex; align-items: center; gap: var(--space-sm);"><i data-lucide="search" style="width: 22px; height: 22px;"></i><span>Rechercher</span></h2>
                    <button class="btn add-food-header-btn" onclick="openAddFoodModal()" style="background: var(--accent-ui); color: white;"><i data-lucide="plus-circle" style="width: 18px; height: 18px;"></i> Ajouter un aliment</button>
                </div>
                <div style="margin-top: var(--space-md); margin-bottom: var(--space-xl); padding: var(--space-md); background: rgba(5, 150, 105, 0.1); border-radius: var(--radius-md); border-left: 3px solid var(--accent-ui);">
                    <div style="display: flex; align-items: start; gap: var(--space-sm);">
                        <i data-lucide="info" style="width: 18px; height: 18px; color: var(--accent-ui); flex-shrink: 0; margin-top: 2px;"></i>
                        <span style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;"><strong>À noter :</strong> Les valeurs sont pour des aliments <strong>crus</strong>. Un œuf moyen pèse environ 50-60g sans coquille.</span>
                    </div></div>

                <div class="grid-2">
                    <div class="input-group">
                        <label>Filtrer</label>
                        <select id="foodFilter" onchange="filterFoodDatabase()">
                            <option value="all">Tous les aliments</option>
                            <option value="custom">Mes aliments personnalisés</option>
                            <option value="community">Base communautaire ☁️</option>
                            <option value="default">Base par défaut</option>
                        </select>
                    </div>

                    <div class="input-group">
                        <label>Trier par</label>
                        <select id="foodSort" onchange="filterFoodDatabase()">
                            <option value="name">Nom (A-Z)</option>
                            <option value="protein">Protéines (décroissant)</option>
                            <option value="carbs">Glucides (décroissant)</option>
                            <option value="fat">Lipides (décroissant)</option>
                            <option value="calories">Calories (décroissant)</option>
                        </select>
                    </div></div>

                <!-- Filtres par catégorie -->
                <div style="display: flex; gap: var(--space-sm); margin-bottom: var(--space-lg); flex-wrap: wrap;">
                    <button class="filter-btn active" data-category="all" onclick="filterFoodsByCategory('all')" style="padding: var(--space-sm) var(--space-md); background: var(--accent-ui); color: white; border: none; border-radius: var(--radius-md); font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: all 0.2s;">
                        Tous
                    </button>
                    <button class="filter-btn" data-category="proteines" onclick="filterFoodsByCategory('proteines')" style="padding: var(--space-sm) var(--space-md); background: var(--bg-tertiary); color: var(--text-secondary); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: var(--radius-md); font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: all 0.2s;">
                        🥩 Protéines
                    </button>
                    <button class="filter-btn" data-category="feculents" onclick="filterFoodsByCategory('feculents')" style="padding: var(--space-sm) var(--space-md); background: var(--bg-tertiary); color: var(--text-secondary); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: var(--radius-md); font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: all 0.2s;">
                        🍚 Féculents
                    </button>
                    <button class="filter-btn" data-category="legumes" onclick="filterFoodsByCategory('legumes')" style="padding: var(--space-sm) var(--space-md); background: var(--bg-tertiary); color: var(--text-secondary); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: var(--radius-md); font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: all 0.2s;">
                        🥬 Légumes
                    </button>
                    <button class="filter-btn" data-category="fruits" onclick="filterFoodsByCategory('fruits')" style="padding: var(--space-sm) var(--space-md); background: var(--bg-tertiary); color: var(--text-secondary); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: var(--radius-md); font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: all 0.2s;">
                        🍎 Fruits
                    </button>
                    <button class="filter-btn" data-category="produits-laitiers" onclick="filterFoodsByCategory('produits-laitiers')" style="padding: var(--space-sm) var(--space-md); background: var(--bg-tertiary); color: var(--text-secondary); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: var(--radius-md); font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: all 0.2s;">
                        🧀 Laitages
                    </button>
                    <button class="filter-btn" data-category="matieres-grasses" onclick="filterFoodsByCategory('matieres-grasses')" style="padding: var(--space-sm) var(--space-md); background: var(--bg-tertiary); color: var(--text-secondary); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: var(--radius-md); font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: all 0.2s;">
                        🧈 Graisses
                    </button>
                    <button class="filter-btn" data-category="liquides" onclick="filterFoodsByCategory('liquides')" style="padding: var(--space-sm) var(--space-md); background: var(--bg-tertiary); color: var(--text-secondary); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: var(--radius-md); font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: all 0.2s;">
                        💧 Liquides
                    </button>
                    <button class="filter-btn" data-category="autres" onclick="filterFoodsByCategory('autres')" style="padding: var(--space-sm) var(--space-md); background: var(--bg-tertiary); color: var(--text-secondary); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: var(--radius-md); font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: all 0.2s;">
                        ❓ Autres
                    </button>
                </div>

                <div class="search-box">
                    <input type="text" id="foodDbSearch" placeholder="Ex: Poulet, Riz basmati, Œufs..." autocomplete="off">
                </div>

                <div class="food-list" id="foodDatabase"></div></div></div>

                <!-- Tracking Tab -->
        <!-- Meal Templates Tab -->
        <div id="meal-templates" class="tab-content">
            <!-- Hero Header -->
            <div style="background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%); border-radius: var(--radius-xl); padding: var(--space-3xl); margin-bottom: var(--space-3xl); border: 1px solid rgba(255, 255, 255, 0.05); box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);">
                <div style="display: flex; align-items: center; gap: var(--space-lg); margin-bottom: var(--space-lg);">
                    <div style="font-size: 3rem; display: flex; align-items: center; justify-content: center; width: 60px; height: 60px; background: var(--accent-ui); border-radius: var(--radius-lg);"><i data-lucide="clipboard-list" style="width: 36px; height: 36px; color: white;"></i></div>
                    <div>
                        <h1 style="font-size: 2rem; font-weight: 700; margin: 0; color: var(--accent-ui);">
                            Mes Repas Types
                        </h1>
                        <p style="margin: 0; margin-top: var(--space-xs); color: var(--text-secondary); font-size: 1rem;">
                            Enregistre tes repas favoris pour les réutiliser facilement
                        </p>
                    </div></div></div>

            <!-- Premium: Bouton importer depuis repas du jour -->
            <div style="margin-bottom: var(--space-xl); display: flex; gap: var(--space-md); flex-wrap: wrap;">
                <button class="copy-yesterday-btn" onclick="importMealFromToday()" style="background: rgba(16, 185, 129, 0.15); border-color: var(--accent-main); color: var(--accent-main);">
                    <i data-lucide="download" style="width: 16px; height: 16px;"></i>
                    <span>Importer depuis un repas du jour</span>
                </button>
            </div>

            <!-- Create New Template Card -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-xl); margin-bottom: var(--space-3xl);">

                <!-- Left: Form -->
                <div class="meal-card" style="border: 1px solid rgba(16, 185, 129, 0.2);">
                    <div class="meal-card-header" style="border-bottom-color: var(--accent-ui);">
                        <div style="display: flex; align-items: center; gap: var(--space-sm);">
                            <i data-lucide="plus-circle" style="width: 24px; height: 24px; color: var(--accent-ui);"></i>
                            <span style="font-weight: 700; font-size: 1.1rem;">Nouveau repas type</span>
                        </div></div>

                    <div style="display: grid; gap: var(--space-lg); flex: 1;">
                        <div class="input-group">
                            <label style="font-weight: 600; margin-bottom: var(--space-xs); display: block;"><i data-lucide="file-text" style="width: 16px; height: 16px; display: inline; vertical-align: middle;"></i> Nom du repas</label>
                            <input type="text" id="new-template-name" placeholder="Ex: Petit-déj protéiné..." style="width: 100%; padding: var(--space-md); font-size: 1rem; background: var(--bg-tertiary); border: 2px solid transparent; border-radius: var(--radius-md); color: var(--text-primary);">
                        </div>

                        <div class="input-group">
                            <label style="font-weight: 600; margin-bottom: var(--space-xs); display: block;"><i data-lucide="book-open" style="width: 16px; height: 16px; display: inline; vertical-align: middle;"></i> Recette / Lien (optionnel)</label>
                            <textarea id="new-template-recipe" placeholder="Instructions, lien vers une recette, notes..."
                                      style="width: 100%; min-height: 100px; padding: var(--space-md); font-size: 0.95rem; background: var(--bg-tertiary); border: 2px solid transparent; border-radius: var(--radius-md); color: var(--text-primary); font-family: 'DM Sans', sans-serif; resize: vertical;"></textarea>
                            <p class="info-text" style="margin-top: var(--space-xs);">Ex: Lien YouTube, instructions de préparation, notes perso</p>
                        </div></div>

                    <button class="btn" onclick="saveNewMealTemplate()" style="margin-top: auto; background: var(--accent-ui); color: white; padding: var(--space-md); font-weight: 700;">
                        <i data-lucide="save" style="width: 18px; height: 18px;"></i> Enregistrer ce repas type
                    </button>
                </div>

                <!-- Right: Foods List + Macros -->
                <div class="meal-card">
                    <div class="meal-card-header">
                        <div style="display: flex; align-items: center; gap: var(--space-sm);">
                            <i data-lucide="utensils-crossed" style="width: 24px; height: 24px; color: var(--accent-ui);"></i>
                            <span style="font-weight: 700; font-size: 1.1rem;">Aliments</span>
                        </div>
                        <div style="font-weight: 700; color: var(--accent-ui);" id="template-cal-total">0 kcal</div></div>

                    <div class="food-list" id="template-foods-list" style="min-height: 200px;">
                        <div style="text-align: center; color: var(--text-secondary); padding: var(--space-2xl);">
                            <i data-lucide="utensils" style="width: 32px; height: 32px; color: var(--accent-ui); margin-bottom: var(--space-sm);"></i>
                            <p style="margin: 0;">Clique ci-dessous pour ajouter des aliments</p>
                        </div></div>

                    <button class="add-food-btn-primary" onclick="openFoodModalForTemplate()">
                        + Ajouter des aliments
                    </button>

                    <!-- Macros Grid -->
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-sm); padding: var(--space-md); background: var(--bg-tertiary); border-radius: var(--radius-md); margin-top: var(--space-md);">
                        <div style="text-align: center;">
                            <div style="font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 2px;">Prot</div>
                            <div style="font-size: 1.1rem; font-weight: 700; color: var(--accent-protein);" id="template-protein-total">0g</div></div>
                        <div style="text-align: center;">
                            <div style="font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 2px;">Glu</div>
                            <div style="font-size: 1.1rem; font-weight: 700; color: var(--accent-carbs);" id="template-carbs-total">0g</div></div>
                        <div style="text-align: center;">
                            <div style="font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 2px;">Lip</div>
                            <div style="font-size: 1.1rem; font-weight: 700; color: var(--accent-fat);" id="template-fat-total">0g</div></div></div></div>
            </div>

            <!-- Templates List -->
            <div class="card">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-2xl);">
                    <div style="display: flex; align-items: center; gap: var(--space-md);">
                        <i data-lucide="book-open" style="width: 28px; height: 28px; color: var(--accent-ui);"></i>
                        <h2 style="font-size: 1.3rem; font-weight: 700; margin-bottom: var(--space-md); color: var(--text-primary);">Mes repas types sauvegardés</h2>
                    </div>
                    <div style="padding: var(--space-sm) var(--space-lg); background: var(--accent-ui); border-radius: var(--radius-full); font-weight: 700; color: white;" id="templates-count">0</div></div>

                <div id="templates-list" style="display: grid; gap: var(--space-lg);">
                    <!-- Templates will be rendered here -->
                </div></div></div>

        <!-- Tracking Tab -->
        <div id="tracking" class="tab-content">
            <!-- Hero Header -->
            <div style="background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%); border-radius: var(--radius-xl); padding: var(--space-3xl); margin-bottom: var(--space-3xl); border: 1px solid rgba(255, 255, 255, 0.05); box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);">
                <div style="display: flex; align-items: center; gap: var(--space-lg); margin-bottom: var(--space-lg);">
                    <div style="font-size: 3rem; display: flex; align-items: center; justify-content: center; width: 60px; height: 60px; background: var(--accent-ui); border-radius: var(--radius-lg);"><i data-lucide="activity" style="width: 36px; height: 36px; color: white;"></i></div>
                    <div>
                        <h1 style="font-size: 2rem; font-weight: 700; margin: 0; color: var(--accent-ui);">
                            Suivi Corporel
                        </h1>
                        <p style="margin: 0; margin-top: var(--space-xs); color: var(--text-secondary); font-size: 1rem;">
                            Suis l'évolution de ton corps sur le long terme
                        </p>
                    </div></div></div>

            <div class="card">
                <h2 style="font-size: 1.3rem; font-weight: 700; margin-bottom: var(--space-md); color: var(--text-primary); display: flex; align-items: center; gap: var(--space-sm);"><i data-lucide="plus-circle" style="width: 22px; height: 22px;"></i><span>Nouvelle mesure</span></h2>

                <p class="info-text" style="margin-bottom: var(--space-xl); font-size: 0.85rem;">
                    Les champs marqués d'un astérisque (<span style="color: var(--accent-danger);">*</span>) sont obligatoires.
                    <a href="#" onclick="switchToTab('health-warning'); setTimeout(() => document.getElementById('metrics-explainer')?.scrollIntoView({behavior: 'smooth'}), 300); return false;" style="color: var(--accent-main); text-decoration: underline; font-weight: 600;"><i data-lucide="info" style="width: 14px; height: 14px; display: inline; vertical-align: middle;"></i> En savoir plus sur les métriques</a>
                </p>

                <div class="input-group" style="max-width: 500px;">
                    <label>Date de la mesure</label>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-md);">
                        <select id="tracking-day" style="background: var(--bg-tertiary); border: 2px solid transparent; color: var(--text-primary); padding: var(--space-md); border-radius: var(--radius-md); font-size: 1rem;">
                            <option value="">Jour</option>
                        </select>
                        <select id="tracking-month" style="background: var(--bg-tertiary); border: 2px solid transparent; color: var(--text-primary); padding: var(--space-md); border-radius: var(--radius-md); font-size: 1rem;">
                            <option value="">Mois</option>
                            <option value="0">Janvier</option>
                            <option value="1">Février</option>
                            <option value="2">Mars</option>
                            <option value="3">Avril</option>
                            <option value="4">Mai</option>
                            <option value="5">Juin</option>
                            <option value="6">Juillet</option>
                            <option value="7">Août</option>
                            <option value="8">Septembre</option>
                            <option value="9">Octobre</option>
                            <option value="10">Novembre</option>
                            <option value="11">Décembre</option>
                        </select>
                        <select id="tracking-year" style="background: var(--bg-tertiary); border: 2px solid transparent; color: var(--text-primary); padding: var(--space-md); border-radius: var(--radius-md); font-size: 1rem;">
                            <option value="">Année</option>
                        </select>
                    </div></div>

                <div class="grid-2">
                    <div class="input-group">
                        <label>Poids (kg) *</label>
                        <input type="number" id="tracking-weight" inputmode="decimal" pattern="[0-9]*" step="0.1" placeholder="Ex: 80.5 kg">
						<p class="info-text">Idéalement le matin, à jeun, pour plus de régularité</p>
                    </div>

                    <div class="input-group">
                        <label>Taux de graisse (%) <span style="opacity: 0.6;">(optionnel)</span></label>
                        <input type="number" id="tracking-bodyfat" inputmode="decimal" pattern="[0-9]*" step="0.1" placeholder="Ex: 25">
                        <p class="info-text">Disponible sur certaines balances connectées</p>
                    </div>

                    <div class="input-group">
                        <label>Masse musculaire (kg) <span style="opacity: 0.6;">(optionnel)</span></label>
                        <input type="number" id="tracking-muscle" inputmode="decimal" pattern="[0-9]*" step="0.1" placeholder="Ex: 55">
                        <p class="info-text">Disponible sur certaines balances connectées</p>
                    </div>

                    <div class="input-group">
                        <label>Masse osseuse (kg) <span style="opacity: 0.6;">(optionnel)</span></label>
                        <input type="number" id="tracking-bone" step="0.1" placeholder="Ex: 3">
                        <p class="info-text">Disponible sur certaines balances connectées</p>
                    </div>

                    <div class="input-group">
                        <label>Protéines (%) <span style="opacity: 0.6;">(optionnel)</span></label>
                        <input type="number" id="tracking-protein-pct" step="0.1" placeholder="Ex: 18">
                        <p class="info-text">Disponible sur certaines balances connectées</p>
                    </div>

                    <div class="input-group">
                        <label>Eau (%) <span style="opacity: 0.6;">(optionnel)</span></label>
                        <input type="number" id="tracking-water" step="0.1" placeholder="Ex: 55">
                        <p class="info-text">Disponible sur certaines balances connectées</p>
                    </div>

                    <div class="input-group">
                        <label>Âge corporel (années) <span style="opacity: 0.6;">(optionnel)</span></label>
                        <input type="number" id="tracking-body-age" step="1" placeholder="Ex: 35">
                        <p class="info-text">Disponible sur certaines balances connectées</p>
                    </div>

                    <div class="input-group">
                        <label>Graisse viscérale <span style="opacity: 0.6;">(optionnel)</span></label>
                        <input type="number" id="tracking-visceral" step="1" placeholder="Ex: 8">
                        <p class="info-text">Disponible sur certaines balances connectées</p>
                    </div></div>

                <div class="input-group">
                    <label>Notes du jour (optionnel)</label>
                    <textarea id="tracking-notes" placeholder="Comment te sens-tu ? Sommeil, énergie, entraînement..."></textarea>
                </div>

                <button class="btn" onclick="saveTracking()" style="display: flex; align-items: center; gap: var(--space-sm);"><i data-lucide="save" style="width: 18px; height: 18px;"></i> Enregistrer</button>

                <!-- Premium: Tendances -->
                <div class="tracking-trends" id="tracking-trends" style="margin-top: var(--space-2xl);">
                    <div class="trend-item">
                        <div class="trend-label"><i data-lucide="trending-down" style="width: 14px; height: 14px; display: inline; vertical-align: middle;"></i> Évolution 14 jours</div>
                        <div class="trend-value" id="trend-14d">—</div>
                    </div>
                    <div class="trend-item">
                        <div class="trend-label"><i data-lucide="scale" style="width: 14px; height: 14px; display: inline; vertical-align: middle;"></i> Moyenne 7 jours</div>
                        <div class="trend-value" id="trend-7d-avg">—</div>
                    </div>
                    <div class="trend-item">
                        <div class="trend-label"><i data-lucide="activity" style="width: 14px; height: 14px; display: inline; vertical-align: middle;"></i> Dernière mesure</div>
                        <div class="trend-value" id="trend-last">—</div>
                    </div>
                </div>

                <div id="tracking-history" style="margin-top: 40px;">
                    <h3 style="margin-bottom: 20px; font-size: 1.5rem;">Ton historique</h3>

                    <div id="chart-buttons" style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px;">
                        <button class="btn-secondary btn chart-toggle-btn" data-chart="weight" onclick="toggleChart('weight')">Poids</button>
                        <button class="btn-secondary btn chart-toggle-btn" data-chart="bodyfat" onclick="toggleChart('bodyfat')">Graisse</button>
                        <button class="btn-secondary btn chart-toggle-btn" data-chart="muscle" onclick="toggleChart('muscle')">Muscle</button>
                        <button class="btn-secondary btn chart-toggle-btn" data-chart="water" onclick="toggleChart('water')">Eau</button>
                        <button class="btn-secondary btn chart-toggle-btn" data-chart="bone" onclick="toggleChart('bone')">Masse Osseuse</button>
                        <button class="btn-secondary btn chart-toggle-btn" data-chart="proteinPct" onclick="toggleChart('proteinPct')">Protéines</button>
                        <button class="btn-secondary btn chart-toggle-btn" data-chart="bodyAge" onclick="toggleChart('bodyAge')">Âge Corporel</button>
                        <button class="btn-secondary btn chart-toggle-btn" data-chart="visceral" onclick="toggleChart('visceral')">Graisse Viscérale</button>
                    </div>

                    <canvas id="tracking-chart" style="max-height: 400px; display: none; margin-bottom: 30px; background: var(--bg-tertiary); padding: var(--space-xl); border-radius: var(--radius-md);"></canvas>

                    <div id="tracking-list"></div></div></div></div>

        <!-- Settings Tab -->
        <!-- Guide Tab -->

            <div id="privacy" class="tab-content">
        <!-- Hero Header -->
        <div style="background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%); border-radius: var(--radius-xl); padding: var(--space-3xl); margin-bottom: var(--space-3xl); border: 1px solid rgba(255, 255, 255, 0.05); box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);">
            <div style="display: flex; align-items: center; gap: var(--space-lg); margin-bottom: var(--space-lg);">
                <div style="font-size: 3rem; display: flex; align-items: center; justify-content: center; width: 60px; height: 60px; background: var(--accent-ui); border-radius: var(--radius-lg);"><i data-lucide="shield-check" style="width: 36px; height: 36px; color: white;"></i></div>
                <div>
                    <h1 style="font-size: 2rem; font-weight: 700; margin: 0; color: var(--accent-ui);">
                        Politique de Confidentialité
                    </h1>
                    <p style="margin: 0; margin-top: var(--space-xs); color: var(--text-secondary); font-size: 1rem;">
                        Tes données sont sécurisées, en local et dans le cloud
                    </p>
                </div></div></div>

        <div class="card">
            <h2 style="font-size: 1.6rem; font-weight: 700; margin-bottom: var(--space-xl); color: var(--text-primary);"><i data-lucide="lock" class="icon-inline"></i> Engagement de Confidentialité</h2>

            <div style="background: rgba(5, 150, 105, 0.1); border-left: 3px solid rgba(16, 185, 129, 0.4); border-radius: var(--radius-md); padding: var(--space-xl); margin-bottom: var(--space-2xl);">
                <p style="margin: 0; font-size: 1.05rem; line-height: 1.8; color: var(--text-primary); font-weight: 500;">
                    <strong>NutriTrack respecte ta vie privée.</strong> Par défaut, tes données sont stockées localement dans ton navigateur. Si tu te connectes avec Google, elles sont également sauvegardées de manière sécurisée sur Firebase (Google Cloud) pour te permettre de les retrouver sur tous tes appareils.
                </p>
            </div>

            <h3 style="font-size: 1.3rem; font-weight: 700; margin: var(--space-2xl) 0 var(--space-lg) 0; color: var(--text-primary);">📊 Quelles données sont collectées ?</h3>
            <div style="background: var(--bg-tertiary); border-radius: var(--radius-md); padding: var(--space-xl); margin-bottom: var(--space-xl);">
                <p style="margin: 0 0 var(--space-md) 0; color: var(--text-secondary); line-height: 1.7;">NutriTrack stocke uniquement les informations que <strong>tu saisis volontairement</strong> :</p>
                <ul style="margin: var(--space-md) 0; padding-left: var(--space-xl); color: var(--text-secondary); line-height: 1.8;">
                    <li>Ton prénom (optionnel)</li>
                    <li>Tes informations personnelles (âge, sexe, taille, poids, niveau d'activité)</li>
                    <li>Tes objectifs nutritionnels</li>
                    <li>Tes repas et aliments consommés</li>
                    <li>Tes mesures corporelles (si tu utilises le suivi)</li>
                    <li>Tes repas types personnalisés</li>
                </ul>
            </div>

            <h3 style="font-size: 1.3rem; font-weight: 700; margin: var(--space-2xl) 0 var(--space-lg) 0; color: var(--text-primary);"><i data-lucide="save" class="icon-inline"></i> Où sont stockées mes données ?</h3>
            <div style="background: var(--bg-tertiary); border-radius: var(--radius-md); padding: var(--space-xl); margin-bottom: var(--space-xl);">
                <p style="margin: 0 0 var(--space-md) 0; color: var(--text-secondary); line-height: 1.7;"><strong>Mode Local (par défaut) :</strong> Tes données sont stockées dans le localStorage de ton navigateur.</p>
                <p style="margin: 0 0 var(--space-md) 0; color: var(--text-secondary); line-height: 1.7;"><strong>Mode Connecté (optionnel) :</strong> Si tu te connectes avec Google, tes données sont également synchronisées sur Firebase Firestore (serveurs Google Cloud sécurisés).</p>
                <ul style="margin: var(--space-md) 0; padding-left: var(--space-xl); color: var(--text-secondary); line-height: 1.8;">
                    <li><strong><i data-lucide="check-circle" class="icon-inline"></i> Accès offline</strong> : L'application fonctionne sans connexion internet</li>
                    <li><strong><i data-lucide="check-circle" class="icon-inline"></i> Synchronisation sécurisée</strong> : Données chiffrées en transit (HTTPS/TLS)</li>
                    <li><strong><i data-lucide="check-circle" class="icon-inline"></i> Contrôle total</strong> : Tu peux exporter, supprimer ou te déconnecter à tout moment</li>
                    <li><strong><i data-lucide="cloud" class="icon-inline"></i> Multi-appareils</strong> : Connecte-toi avec Google pour retrouver tes données partout</li>
                </ul>
            </div>

            <h3 style="font-size: 1.3rem; font-weight: 700; margin: var(--space-2xl) 0 var(--space-lg) 0; color: var(--text-primary);">☁️ À propos de la synchronisation cloud</h3>
            <div style="background: var(--bg-tertiary); border-radius: var(--radius-md); padding: var(--space-xl); margin-bottom: var(--space-xl);">
                <p style="margin: 0 0 var(--space-md) 0; color: var(--text-secondary); line-height: 1.7;">Si tu choisis de te connecter avec Google :</p>
                <ul style="margin: var(--space-md) 0; padding-left: var(--space-xl); color: var(--text-secondary); line-height: 1.8;">
                    <li><strong>Service utilisé :</strong> Firebase Firestore (Google Cloud Platform)</li>
                    <li><strong>Données synchronisées :</strong> Profil, repas, aliments personnalisés, macros, suivi</li>
                    <li><strong>Sécurité :</strong> Connexion HTTPS/TLS, authentification OAuth2</li>
                    <li><strong>Accès :</strong> Seul toi peux accéder à tes données via ton compte Google</li>
                    <li><strong>Suppression :</strong> Tu peux te déconnecter et supprimer tes données cloud à tout moment</li>
                </ul>
            </div>

            <h3 style="font-size: 1.3rem; font-weight: 700; margin: var(--space-2xl) 0 var(--space-lg) 0; color: var(--text-primary);">🚫 Ce que nous ne faisons PAS</h3>
            <div style="background: var(--bg-tertiary); border-radius: var(--radius-md); padding: var(--space-xl); margin-bottom: var(--space-xl);">
                <ul style="margin: 0; padding-left: var(--space-xl); color: var(--text-secondary); line-height: 1.8;">
                    <li><i data-lucide="x-circle" class="icon-inline"></i> Nous ne collectons aucune donnée analytique</li>
                    <li><i data-lucide="x-circle" class="icon-inline"></i> Nous n'utilisons aucun cookie de tracking</li>
                    <li><i data-lucide="x-circle" class="icon-inline"></i> Nous ne vendons jamais tes données</li>
                    <li><i data-lucide="x-circle" class="icon-inline"></i> Nous n'avons pas accès à tes informations personnelles</li>
                    <li><i data-lucide="x-circle" class="icon-inline"></i> Nous ne suivons pas ton activité</li>
                </ul>
            </div>

            <h3 style="font-size: 1.3rem; font-weight: 700; margin: var(--space-2xl) 0 var(--space-lg) 0; color: var(--text-primary);">🔐 Sécurité de tes données</h3>
            <div style="background: var(--bg-tertiary); border-radius: var(--radius-md); padding: var(--space-xl); margin-bottom: var(--space-xl);">
                <p style="margin: 0 0 var(--space-md) 0; color: var(--text-secondary); line-height: 1.7;">Pour protéger tes données :</p>
                <ul style="margin: var(--space-md) 0; padding-left: var(--space-xl); color: var(--text-secondary); line-height: 1.8;">
                    <li>Utilise un mot de passe/code sur ton appareil</li>
                    <li>Garde ton navigateur à jour</li>
                    <li>Connecte-toi avec Google pour une sauvegarde automatique dans le cloud</li>
                    <li>Ou exporte régulièrement tes données en JSON depuis les Paramètres</li>
                </ul>
            </div>

            <h3 style="font-size: 1.3rem; font-weight: 700; margin: var(--space-2xl) 0 var(--space-lg) 0; color: var(--text-primary);"><i data-lucide="lightbulb" class="icon-inline"></i> Gestion de tes données</h3>
            <div style="background: var(--bg-tertiary); border-radius: var(--radius-md); padding: var(--space-xl); margin-bottom: var(--space-xl);">
                <p style="margin: 0 0 var(--space-md) 0; color: var(--text-secondary); line-height: 1.7;">Tu as un contrôle total sur tes données :</p>
                <ul style="margin: var(--space-md) 0; padding-left: var(--space-xl); color: var(--text-secondary); line-height: 1.8;">
                    <li><strong>Exporter</strong> : Dans Paramètres → Exporter mes données (fichier JSON)</li>
                    <li><strong>Importer</strong> : Dans Paramètres → Importer des données</li>
                    <li><strong>Cloud</strong> : Dans Paramètres → Sync Cloud → Restaurer ou Synchroniser</li>
                    <li><strong>Supprimer</strong> : Dans Paramètres → Réinitialiser l'application (suppression totale)</li>
                </ul>
            </div>

            <h3 style="font-size: 1.3rem; font-weight: 700; margin: var(--space-2xl) 0 var(--space-lg) 0; color: var(--text-primary);">📧 Questions ?</h3>
            <div style="background: var(--bg-tertiary); border-radius: var(--radius-md); padding: var(--space-xl);">
                <p style="margin: 0; color: var(--text-secondary); line-height: 1.7;">
                    Cette politique peut être mise à jour pour refléter des changements dans l'application. Toute modification majeure sera communiquée dans l'interface.
                </p>
                <p style="margin: var(--space-md) 0 0; color: var(--text-secondary); line-height: 1.7;">
                    <strong>Dernière mise à jour :</strong> Décembre 2025
                </p>
            </div>

            <div style="margin-top: var(--space-3xl); padding: var(--space-xl); background: rgba(5, 150, 105, 0.05); border-radius: var(--radius-lg); text-align: center;">
                <p style="margin: 0; font-size: 1.1rem; font-weight: 600; color: var(--accent-ui);">
                    🛡️ Tes données t'appartiennent. Point final.
                </p>
            </div></div></div>

    <div id="guide" class="tab-content">
            <!-- Hero Header -->
            <div style="background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%); border-radius: var(--radius-xl); padding: var(--space-3xl); margin-bottom: var(--space-3xl); border: 1px solid rgba(255, 255, 255, 0.05); box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);">
                <div style="display: flex; align-items: center; gap: var(--space-lg); margin-bottom: var(--space-lg);">
                    <div style="font-size: 3rem; display: flex; align-items: center; justify-content: center; width: 60px; height: 60px; background: var(--accent-ui); border-radius: var(--radius-lg);"><i data-lucide="book-open" style="width: 36px; height: 36px; color: white;"></i></div>
                    <div>
                        <h1 style="font-size: 2rem; font-weight: 700; margin: 0; color: var(--accent-ui);">
                            Guide Complet
                        </h1>
                        <p style="margin: 0; margin-top: var(--space-xs); color: var(--text-secondary); font-size: 1rem;">
                            Tout ce que tu dois savoir pour maîtriser l'application
                        </p>
                    </div></div></div>

            <!-- Table of Contents -->
            <div class="card" style="margin-bottom: var(--space-3xl); background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%); border: 1px solid rgba(16, 185, 129, 0.2);">
                <h2 style="font-size: 1.3rem; font-weight: 700; margin-bottom: var(--space-md); color: var(--text-primary); display: flex; align-items: center; gap: var(--space-sm);">
                    <i data-lucide="map" style="width: 26px; height: 26px;"></i><span>Sommaire</span>
                </h2>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-lg);">
                    <a href="#guide-start" style="padding: var(--space-md); background: var(--bg-secondary); border-radius: var(--radius-md); border-left: 3px solid var(--accent-ui); text-decoration: none; color: var(--text-primary); font-weight: 600; transition: var(--transition-fast);">Démarrage rapide</a>
                    <a href="#guide-calculator" style="padding: var(--space-md); background: var(--bg-secondary); border-radius: var(--radius-md); border-left: 3px solid var(--accent-ui); text-decoration: none; color: var(--text-primary); font-weight: 600;">Calculateur de macros</a>
                    <a href="#guide-meals" style="padding: var(--space-md); background: var(--bg-secondary); border-radius: var(--radius-md); border-left: 3px solid var(--accent-carbs); text-decoration: none; color: var(--text-primary); font-weight: 600;">Mes Repas</a>
                    <a href="#guide-planner" style="padding: var(--space-md); background: var(--bg-secondary); border-radius: var(--radius-md); border-left: 3px solid var(--accent-purple); text-decoration: none; color: var(--text-primary); font-weight: 600;">Planning Semaine</a>
                    <a href="#guide-foods" style="padding: var(--space-md); background: var(--bg-secondary); border-radius: var(--radius-md); border-left: 3px solid var(--accent-fat); text-decoration: none; color: var(--text-primary); font-weight: 600;">Base d'Aliments</a>
                    <a href="#guide-templates" style="padding: var(--space-md); background: var(--bg-secondary); border-radius: var(--radius-md); border-left: 3px solid var(--accent-fat); text-decoration: none; color: var(--text-primary); font-weight: 600;">Repas Types</a>
                    <a href="#guide-tracking" style="padding: var(--space-md); background: var(--bg-secondary); border-radius: var(--radius-md); border-left: 3px solid var(--accent-protein); text-decoration: none; color: var(--text-primary); font-weight: 600;">Suivi Corporel</a>
                    <a href="#guide-tips" style="padding: var(--space-md); background: var(--bg-secondary); border-radius: var(--radius-md); border-left: 3px solid var(--accent-protein); text-decoration: none; color: var(--text-primary); font-weight: 600;">Astuces Pro</a>
                </div></div>

            <!-- Démarrage Rapide -->
            <div class="card" id="guide-start">
                <h2 style="font-size: 1.3rem; font-weight: 700; margin-bottom: var(--space-md); color: var(--text-primary);">
                    <span style="display: inline-flex; align-items: center; justify-content: center; width: 50px; height: 50px; background: var(--accent-ui); border-radius: var(--radius-md); margin-right: var(--space-sm);"><i data-lucide="zap" style="width: 28px; height: 28px; color: white;"></i></span> Démarrage Rapide (5 minutes)
                </h2>

                <div style="background: var(--bg-tertiary); border-radius: var(--radius-md); padding: var(--space-xl); border-left: 3px solid rgba(16, 185, 129, 0.4); margin-bottom: var(--space-2xl);">
                    <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: var(--space-lg);"><i data-lucide="check-square" style="width: 20px; height: 20px; color: var(--accent-ui);"></i> Checklist première utilisation</h3>
                    <ol style="line-height: 1.8; color: var(--text-secondary); margin-left: var(--space-xl);">
                        <li style="margin-bottom: var(--space-sm);"><strong style="color: var(--text-primary);">Va dans "Calculateur"</strong> → Remplis tes infos (âge, sexe, taille, poids, activité)</li>
                        <li style="margin-bottom: var(--space-sm);"><strong style="color: var(--text-primary);">Choisis ton objectif</strong> → Sèche ou Prise de masse</li>
                        <li style="margin-bottom: var(--space-sm);"><strong style="color: var(--text-primary);">Clique "Calculer mes Macros"</strong> → Tes besoins s'affichent (protéines, glucides, lipides, calories)</li>
                        <li style="margin-bottom: var(--space-sm);"><strong style="color: var(--text-primary);">Va dans "<i data-lucide="utensils" style="width: 18px; height: 18px;"></i> Mes Repas"</strong> → Commence à logger ta journée</li>
                        <li><strong style="color: var(--text-primary);">Utilise Quick Add ⚡</strong> → Tape 2 lettres, clique sur l'aliment, c'est ajouté !</li>
                    </ol>
                </div>

                <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: var(--space-lg);">
                    <strong style="color: var(--text-primary);">🎯 L'objectif :</strong> Atteindre tes macros chaque jour pour progresser vers ton objectif (perte de poids, prise de muscle, etc.)
                </p>
            </div>

            <!-- Calculateur -->
            <div class="card" id="guide-calculator">
                <h2 style="font-size: 1.3rem; font-weight: 700; margin-bottom: var(--space-md); color: var(--text-primary);">
                    <span style="display: inline-flex; align-items: center; justify-content: center; width: 50px; height: 50px; background: var(--accent-ui); border-radius: var(--radius-md); margin-right: var(--space-sm);"><i data-lucide="calculator" style="width: 28px; height: 28px; color: white;"></i></span> Calculateur de Macros
                </h2>

                <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: var(--space-lg); color: var(--accent-ui);">📝 Remplis tes informations</h3>
                <ul style="line-height: 1.8; color: var(--text-secondary); margin-left: var(--space-xl); margin-bottom: var(--space-2xl);">
                    <li><strong style="color: var(--text-primary);">Date de naissance :</strong> Dropdowns jour/mois/année (âge calculé automatiquement)</li>
                    <li><strong style="color: var(--text-primary);">Sexe :</strong> Homme ou Femme (formule BMR différente)</li>
                    <li><strong style="color: var(--text-primary);">Taille :</strong> En centimètres (ex: 175 cm)</li>
                    <li><strong style="color: var(--text-primary);">Poids :</strong> En kilogrammes (ex: 80 kg) → <em style="color: var(--accent-carbs);">Se sync auto avec le Suivi !</em></li>
                    <li><strong style="color: var(--text-primary);">Niveau d'activité :</strong> De sédentaire (1.2) à très actif (1.9)</li>
                </ul>

                <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: var(--space-lg); color: var(--accent-ui);">🎯 Choisis ton objectif</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-lg); margin-bottom: var(--space-2xl);">
                    <div style="background: var(--bg-tertiary); padding: var(--space-xl); border-radius: var(--radius-md); border-left: 4px solid var(--accent-protein);">
                        <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: var(--space-md);">🔥 Sèche (Cut)</h4>
                        <p style="color: var(--text-secondary); margin-bottom: var(--space-md);">Perte de poids / gras</p>
                        <ul style="color: var(--text-secondary); margin-left: var(--space-lg); line-height: 1.6;">
                            <li>Déficit calorique (10-30%)</li>
                            <li>Protéines élevées (1.5-2.5g/kg)</li>
                            <li>Lipides modérés (0.6-1.2g/kg)</li>
                        </ul>
                    </div>
                    <div style="background: var(--bg-tertiary); padding: var(--space-xl); border-radius: var(--radius-md); border-left: 4px solid var(--accent-carbs);">
                        <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: var(--space-md);">💪 Prise de masse (Bulk)</h4>
                        <p style="color: var(--text-secondary); margin-bottom: var(--space-md);">Gain de muscle / poids</p>
                        <ul style="color: var(--text-secondary); margin-left: var(--space-lg); line-height: 1.6;">
                            <li>Surplus calorique (5-15%)</li>
                            <li>Protéines élevées (1.8-2.5g/kg)</li>
                            <li>Lipides modérés (0.8-1.2g/kg)</li>
                        </ul>
                    </div></div>

                <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: var(--space-lg); color: var(--accent-ui);">Tes résultats</h3>
                <ul style="line-height: 1.8; color: var(--text-secondary); margin-left: var(--space-xl);">
                    <li><strong style="color: var(--text-primary);">BMR (Métabolisme de base) :</strong> Calories brûlées au repos complet</li>
                    <li><strong style="color: var(--text-primary);">TDEE (Dépense énergétique) :</strong> BMR × Niveau d'activité = calories totales par jour</li>
                    <li><strong style="color: var(--text-primary);">IMC :</strong> Indicateur de corpulence (attention, ne prend pas en compte la masse musculaire)</li>
                    <li><strong style="color: var(--text-primary);">Macros cibles :</strong> Protéines / Glucides / Lipides en grammes + Calories totales</li>
                </ul>
            </div>

            <!-- Mes Repas -->
            <div class="card" id="guide-meals">
                <h2 style="font-size: 1.3rem; font-weight: 700; margin-bottom: var(--space-md); color: var(--text-primary);">
                    <span style="display: inline-flex; align-items: center; justify-content: center; width: 50px; height: 50px; background: var(--accent-ui); border-radius: var(--radius-md); margin-right: var(--space-sm);"><i data-lucide="utensils" style="width: 28px; height: 28px; color: white;"></i></span> Mes Repas (Usage Quotidien)
                </h2>

                <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(6, 182, 212, 0.15)); border-radius: var(--radius-md); padding: var(--space-xl); border-left: 3px solid rgba(16, 185, 129, 0.4); margin-bottom: var(--space-2xl);">
                    <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: var(--space-md);">🎯 Widget "Il te reste à manger"</h3>
                    <p style="color: var(--text-secondary); line-height: 1.8;">
                        En haut de page, un widget te montre en temps réel combien de <strong>protéines, glucides, lipides et calories</strong> il te reste à consommer pour atteindre tes objectifs. Mise à jour instantanée à chaque ajout !
                    </p>
                </div>

                <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: var(--space-lg); color: var(--accent-ui);">⚡ Quick Add (Méthode recommandée)</h3>
                <ol style="line-height: 1.8; color: var(--text-secondary); margin-left: var(--space-xl); margin-bottom: var(--space-2xl);">
                    <li style="margin-bottom: var(--space-sm);"><strong style="color: var(--text-primary);">Tape 2-3 lettres</strong> dans la barre Quick Add (ex: "pou" pour poulet)</li>
                    <li style="margin-bottom: var(--space-sm);"><strong style="color: var(--text-primary);">Les résultats s'affichent</strong> instantanément (max 8 aliments)</li>
                    <li style="margin-bottom: var(--space-sm);"><strong style="color: var(--text-primary);">Tes favoris ⭐ apparaissent en premier</strong></li>
                    <li style="margin-bottom: var(--space-sm);"><strong style="color: var(--text-primary);">1 clic sur l'aliment</strong> → Ajouté direct 100g au repas</li>
                    <li><strong style="color: var(--text-primary);">Ajuste la quantité après</strong> si besoin (input à côté de l'aliment)</li>
                </ol>

                <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: var(--space-lg); color: var(--accent-ui);">⭐ Système de Favoris</h3>
                <ul style="line-height: 1.8; color: var(--text-secondary); margin-left: var(--space-xl); margin-bottom: var(--space-2xl);">
                    <li><strong style="color: var(--text-primary);">Étoile grise/blanche ☆ :</strong> Aliment non favori</li>
                    <li><strong style="color: var(--text-primary);">Étoile jaune ⭐ :</strong> Aliment favori</li>
                    <li><strong style="color: var(--text-primary);">Clic sur l'étoile :</strong> Toggle favori/pas favori (toutes les étoiles se mettent à jour instantanément)</li>
                    <li><strong style="color: var(--text-primary);">Dans Quick Add :</strong> Tes favoris apparaissent toujours en premier dans les résultats</li>
                    <li><strong style="color: var(--text-primary);">Astuce :</strong> Marque en favoris tes 20-30 aliments récurrents = accès 10x plus rapide !</li>
                </ul>

                <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: var(--space-lg); color: var(--accent-ui);">📋 Repas Types (Chargement rapide)</h3>
                <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: var(--space-lg);">
                    Chaque repas a 2 boutons :
                </p>
                <ul style="line-height: 1.8; color: var(--text-secondary); margin-left: var(--space-xl);">
                    <li><strong style="color: var(--accent-carbs);">Charger un repas type :</strong> Charge un repas pré-enregistré (tous les aliments ajoutés d'un coup)</li>
                    <li><strong style="color: var(--accent-purple);">Enregistrer comme repas type :</strong> Sauvegarde le repas actuel pour le réutiliser plus tard</li>
                </ul>
            </div>

            <!-- Planning Semaine -->
            <div class="card" id="guide-planner">
                <h2 style="font-size: 1.3rem; font-weight: 700; margin-bottom: var(--space-md); color: var(--text-primary);">
                    <span style="display: inline-flex; align-items: center; justify-content: center; width: 50px; height: 50px; background: var(--accent-ui); border-radius: var(--radius-md); margin-right: var(--space-sm);"><i data-lucide="calendar" style="width: 28px; height: 28px; color: white;"></i></span> Planning Hebdomadaire
                </h2>

                <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: var(--space-2xl);">
                    Vue d'ensemble de ta semaine nutritionnelle. Les repas saisis dans "<i data-lucide="utensils" style="width: 18px; height: 18px;"></i> Mes Repas" apparaissent automatiquement ici.
                </p>

                <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: var(--space-lg); color: var(--accent-ui);">🔍 Que vois-tu ?</h3>
                <ul style="line-height: 1.8; color: var(--text-secondary); margin-left: var(--space-xl); margin-bottom: var(--space-2xl);">
                    <li><strong style="color: var(--text-primary);">7 cartes (Lun → Dim) :</strong> Chaque jour affiche tous les repas</li>
                    <li><strong style="color: var(--text-primary);">Macros par repas :</strong> P/g/L détaillés pour chaque repas</li>
                    <li><strong style="color: var(--text-primary);">Totaux journaliers :</strong> Somme des macros de la journée</li>
                    <li><strong style="color: var(--text-primary);">Badge objectif :</strong> Dans l'objectif / Presque / Hors objectif</li>
                    <li><strong style="color: var(--text-primary);">Navigation semaine :</strong> Boutons pour voir semaine précédente/suivante</li>
                </ul>

                <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: var(--space-lg); color: var(--accent-ui);"><i data-lucide="lock" style="width: 18px; height: 18px;"></i> Journée Clôturée</h3>
                <p style="color: var(--text-secondary); line-height: 1.8;">
                    Tu peux <strong>clôturer une journée</strong> pour la verrouiller (badge <i data-lucide="lock" class="icon-inline"></i>). Utile pour éviter les modifications accidentelles des jours passés.
                </p>
            </div>

            <!-- Base d'Aliments -->
            <div class="card" id="guide-foods">
                <h2 style="font-size: 1.3rem; font-weight: 700; margin-bottom: var(--space-md); color: var(--text-primary);">
                    <span style="display: inline-flex; align-items: center; justify-content: center; width: 50px; height: 50px; background: var(--accent-ui); border-radius: var(--radius-md); margin-right: var(--space-sm);"><i data-lucide="book-open" style="width: 28px; height: 28px; color: white;"></i></span> Base d'Aliments
                </h2>

                <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: var(--space-2xl);">
                    300+ aliments français pré-enregistrés + possibilité d'ajouter tes aliments personnalisés.
                </p>

                <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: var(--space-lg); color: var(--accent-ui);">🔍 Filtrer & Trier</h3>
                <ul style="line-height: 1.8; color: var(--text-secondary); margin-left: var(--space-xl); margin-bottom: var(--space-2xl);">
                    <li><strong style="color: var(--text-primary);">Filtrer :</strong> Tous / Mes aliments perso / Base par défaut</li>
                    <li><strong style="color: var(--text-primary);">Trier :</strong> Nom (A-Z) / Protéines / Glucides / Lipides / Calories (décroissant)</li>
                    <li><strong style="color: var(--text-primary);">Recherche :</strong> Barre de recherche pour filtrer rapidement</li>
                </ul>

                <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: var(--space-lg); color: var(--accent-ui);"><i data-lucide="plus-circle" style="width: 18px; height: 18px;"></i> Ajouter un aliment Personnalisé</h3>
                <ol style="line-height: 1.8; color: var(--text-secondary); margin-left: var(--space-xl); margin-bottom: var(--space-2xl);">
                    <li style="margin-bottom: var(--space-sm);">Clique "<i data-lucide="plus-circle" style="width: 18px; height: 18px;"></i> Ajouter un aliment"</li>
                    <li style="margin-bottom: var(--space-sm);">Remplis : Nom, Unité (100g, 1u, 100ml...)</li>
                    <li style="margin-bottom: var(--space-sm);">Entre les macros : Protéines, Glucides, Lipides (obligatoires)</li>
                    <li style="margin-bottom: var(--space-sm);">Calories calculées automatiquement (P×4 + g×4 + L×9)</li>
                    <li>L'aliment est ajouté à ta base perso et accessible partout dans l'app</li>
                </ol>

                <div style="background: rgba(255, 159, 64, 0.1); border-radius: var(--radius-md); padding: var(--space-lg); border-left: 4px solid var(--accent-fat);">
                    <p style="color: var(--text-secondary); line-height: 1.8; margin: 0;">
                        <strong style="color: var(--accent-fat);"><i data-lucide="lightbulb" class="icon-inline"></i> Astuce :</strong> Les aliments personnalisés sont sauvegardés en local (localStorage) et persistent même après fermeture du navigateur.
                    </p>
                </div></div>

            <!-- Repas Types -->
            <div class="card" id="guide-templates">
                <h2 style="font-size: 1.3rem; font-weight: 700; margin-bottom: var(--space-md); color: var(--text-primary);">
                    <span style="display: inline-flex; align-items: center; justify-content: center; width: 50px; height: 50px; background: var(--accent-ui); border-radius: var(--radius-md); margin-right: var(--space-sm);"><i data-lucide="clipboard-list" style="width: 28px; height: 28px; color: white;"></i></span> Repas Types
                </h2>

                <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: var(--space-2xl);">
                    Gagne du temps en créant des <strong>repas types</strong> réutilisables. Idéal si tu manges souvent les mêmes combinaisons d'aliments.
                </p>

                <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: var(--space-lg); color: var(--accent-ui);"><i data-lucide="plus" class="icon-inline"></i> Créer un Repas Type</h3>
                <ol style="line-height: 1.8; color: var(--text-secondary); margin-left: var(--space-xl); margin-bottom: var(--space-2xl);">
                    <li style="margin-bottom: var(--space-sm);">Entre un <strong>nom descriptif</strong> (ex: "Petit-déj protéiné", "Déjeuner rapide")</li>
                    <li style="margin-bottom: var(--space-sm);">Clique "+ Ajouter des aliments"</li>
                    <li style="margin-bottom: var(--space-sm);">Recherche et ajoute tous les aliments du repas</li>
                    <li style="margin-bottom: var(--space-sm);">Les <strong>macros totales</strong> se calculent automatiquement</li>
                    <li>Clique "<i data-lucide="save" style="width: 18px; height: 18px;"></i> Enregistrer ce repas type"</li>
                </ol>

                <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: var(--space-lg); color: var(--accent-ui);">🔄 Utiliser un Repas Type</h3>
                <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: var(--space-lg);">
                    Dans <strong><i data-lucide="utensils" style="width: 18px; height: 18px;"></i> Mes Repas</strong>, chaque repas a un bouton <strong style="color: var(--accent-carbs);">Charger un repas type</strong>. Clique dessus, choisis ton repas type, et tous les aliments sont ajoutés instantanément !
                </p>

                <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: var(--space-lg); color: var(--accent-ui);"><i data-lucide="edit-3" style="width: 18px; height: 18px;"></i> Modifier / <i data-lucide="trash-2" style="width: 18px; height: 18px;"></i> Supprimer</h3>
                <ul style="line-height: 1.8; color: var(--text-secondary); margin-left: var(--space-xl);">
                    <li><strong style="color: var(--text-primary);">Modifier :</strong> Clique "<i data-lucide="edit-3" style="width: 18px; height: 18px;"></i> Modifier" → Le repas se charge dans le formulaire → Modifie → Sauvegarde</li>
                    <li><strong style="color: var(--text-primary);">Supprimer :</strong> Clique "<i data-lucide="trash-2" style="width: 18px; height: 18px;"></i> Supprimer" → Confirmation → Supprimé définitivement</li>
                </ul>
            </div>

            <!-- Suivi Corporel -->
            <div class="card" id="guide-tracking">
                <h2 style="font-size: 1.3rem; font-weight: 700; margin-bottom: var(--space-md); color: var(--text-primary);">
                    <span style="display: inline-flex; align-items: center; justify-content: center; width: 50px; height: 50px; background: var(--accent-ui); border-radius: var(--radius-md); margin-right: var(--space-sm);"><i data-lucide="trending-up" style="width: 28px; height: 28px; color: white;"></i></span> Suivi Corporel
                </h2>

                <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: var(--space-2xl);">
                    Mesure ton évolution physique dans le temps : poids, % de graisse, masse musculaire, etc.
                </p>

                <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: var(--space-lg); color: var(--accent-ui);">📝 Enregistrer une Mesure</h3>
                <ul style="line-height: 1.8; color: var(--text-secondary); margin-left: var(--space-xl); margin-bottom: var(--space-2xl);">
                    <li><strong style="color: var(--text-primary);">Date :</strong> Sélectionne la date de mesure</li>
                    <li><strong style="color: var(--text-primary);">Poids (obligatoire) :</strong> En kilogrammes (ex: 80.5)</li>
                    <li><strong style="color: var(--text-primary);">Données optionnelles :</strong> Taux de graisse (%), Masse musculaire (kg), Masse osseuse (kg), Taux de protéines (%), Eau corporelle (%), Âge métabolique, Graisse viscérale</li>
                    <li><strong style="color: var(--text-primary);">Notes :</strong> Champ libre pour commentaires (ex: "Pesée matin à jeun")</li>
                </ul>

                <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(6, 182, 212, 0.15)); border-radius: var(--radius-md); padding: var(--space-xl); border-left: 3px solid rgba(16, 185, 129, 0.4); margin-bottom: var(--space-2xl);">
                    <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: var(--space-md);">⚖️ Synchronisation Automatique</h3>
                    <p style="color: var(--text-secondary); line-height: 1.8; margin: 0;">
                        Quand tu enregistres un nouveau poids dans le Suivi, il <strong>met automatiquement à jour le poids du Calculateur</strong> et <strong>recalcule tes macros</strong> ! Plus besoin de tout faire manuellement.
                    </p>
                </div>

                <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: var(--space-lg); color: var(--accent-ui);">Historique</h3>
                <p style="color: var(--text-secondary); line-height: 1.8;">
                    Tous tes suivis sont affichés en liste avec la possibilité de <strong><i data-lucide="edit-3" style="width: 18px; height: 18px;"></i> Modifier</strong> ou <strong><i data-lucide="trash-2" style="width: 18px; height: 18px;"></i> Supprimer</strong> chaque entrée. Idéal pour suivre ton évolution semaine après semaine.
                </p>
            </div>

            <!-- Astuces Pro -->
            <div class="card" id="guide-tips">
                <h2 style="font-size: 1.3rem; font-weight: 700; margin-bottom: var(--space-md); color: var(--text-primary);">
                    <span style="display: inline-flex; align-items: center; justify-content: center; width: 50px; height: 50px; background: var(--accent-ui); border-radius: var(--radius-md); margin-right: var(--space-sm);"><i data-lucide="lightbulb" style="width: 28px; height: 28px; color: white;"></i></span> Astuces Pro
                </h2>

                <div style="display: grid; gap: var(--space-xl);">
                    <div style="background: var(--bg-tertiary); padding: var(--space-xl); border-radius: var(--radius-md); border-left: 3px solid rgba(16, 185, 129, 0.4);">
                        <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: var(--space-md);">⚡ Utilise Quick Add à fond</h3>
                        <p style="color: var(--text-secondary); line-height: 1.8; margin: 0;">
                            Oublie les modals. Tape 2-3 lettres, clique l'aliment = ajouté en 100g. Ajuste après si besoin. C'est <strong>10x plus rapide</strong> qu'avant.
                        </p>
                    </div>

                    <div style="background: var(--bg-tertiary); padding: var(--space-xl); border-radius: var(--radius-md); border-left: 4px solid var(--accent-carbs);">
                        <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: var(--space-md);">⭐ Marque tes 20-30 favoris</h3>
                        <p style="color: var(--text-secondary); line-height: 1.8; margin: 0;">
                            Tu manges souvent les mêmes aliments ? Mets-les en favoris (étoile). Ils apparaîtront toujours en premier dans Quick Add. Gain de temps énorme !
                        </p>
                    </div>

                    <div style="background: var(--bg-tertiary); padding: var(--space-xl); border-radius: var(--radius-md); border-left: 4px solid var(--accent-fat);">
                        <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: var(--space-md);">📋 Crée des Repas Types</h3>
                        <p style="color: var(--text-secondary); line-height: 1.8; margin: 0;">
                            Petit-déj identique tous les matins ? Crée un repas type. Tu pourras le charger en 1 clic au lieu de tout re-ajouter. Parfait pour la routine.
                        </p>
                    </div>

                    <div style="background: var(--bg-tertiary); padding: var(--space-xl); border-radius: var(--radius-md); border-left: 4px solid var(--accent-protein);">
                        <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: var(--space-md);">📈 Pèse-toi régulièrement</h3>
                        <p style="color: var(--text-secondary); line-height: 1.8; margin: 0;">
                            1-2x par semaine minimum. Ton poids se sync auto dans le Calculateur et tes macros s'ajustent. Tu restes toujours sur la bonne voie.
                        </p>
                    </div>

                    <div style="background: var(--bg-tertiary); padding: var(--space-xl); border-radius: var(--radius-md); border-left: 4px solid var(--accent-purple);">
                        <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: var(--space-md);">🎯 Suis le widget "Reste du jour"</h3>
                        <p style="color: var(--text-secondary); line-height: 1.8; margin: 0;">
                            En haut de "Mes Repas", tu vois en temps réel ce qu'il te reste à manger. Plus besoin de calculer mentalement. Tu sais instantanément si tu peux te permettre un snack.
                        </p>
                    </div>

                    <div style="background: var(--bg-tertiary); padding: var(--space-xl); border-radius: var(--radius-md); border-left: 4px solid var(--accent-danger);">
                        <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: var(--space-md);"><i data-lucide="lock" style="width: 18px; height: 18px;"></i> Clôture tes journées</h3>
                        <p style="color: var(--text-secondary); line-height: 1.8; margin: 0;">
                            Journée terminée ? Clôture-la dans Mes Repas (badge <i data-lucide="lock" class="icon-inline"></i> apparaît). Ça t'évite de modifier accidentellement les jours passés en naviguant.
                        </p>
                    </div></div></div>

            <!-- FAQ -->
            <div class="card" style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(6, 182, 212, 0.05)); border: 1px solid rgba(16, 185, 129, 0.2);">
                <h2 style="font-size: 1.3rem; font-weight: 700; margin-bottom: var(--space-md); color: var(--text-primary);">
                    <span style="display: inline-flex; align-items: center; justify-content: center; width: 50px; height: 50px; background: var(--accent-ui); border-radius: var(--radius-md); margin-right: var(--space-sm);"><i data-lucide="help-circle" style="width: 28px; height: 28px; color: white;"></i></span> Questions Fréquentes
                </h2>

                <div style="display: grid; gap: var(--space-xl);">
                    <div>
                        <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: var(--space-sm); color: var(--accent-ui);">Mes données sont-elles sauvegardées ?</h3>
                        <p style="color: var(--text-secondary); line-height: 1.8; margin: 0;">
                            Oui ! Tout est sauvegardé en <strong>localStorage</strong> (stockage local du navigateur). Tes données restent même si tu fermes le site. Attention : si tu vides le cache navigateur, tu perds tout.
                        </p>
                    </div>

                    <div>
                        <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: var(--space-sm); color: var(--accent-ui);">Puis-je utiliser l'app sur mobile ?</h3>
                        <p style="color: var(--text-secondary); line-height: 1.8; margin: 0;">
                            Oui ! L'app est <strong>responsive</strong> et fonctionne parfaitement sur smartphone et tablette.
                        </p>
                    </div>

                    <div>
                        <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: var(--space-sm); color: var(--accent-ui);">Comment exporter/sauvegarder mes données ?</h3>
                        <p style="color: var(--text-secondary); line-height: 1.8; margin: 0;">
                            Va dans <strong>⚙️ Paramètres</strong> → Section "Sauvegarde & Export" → Tu peux exporter tes données en JSON ou supprimer toutes tes données.
                        </p>
                    </div>

                    <div>
                        <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: var(--space-sm); color: var(--accent-ui);">Le calculateur est-il précis ?</h3>
                        <p style="color: var(--text-secondary); line-height: 1.8; margin: 0;">
                            Il utilise la <strong>formule Mifflin-St Jeor</strong> (référence scientifique). C'est une estimation précise mais pas parfaite. Ajuste selon tes résultats (si tu stagnes, réduis de 100-200 kcal).
                        </p>
                    </div>

                    <div>
                        <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: var(--space-sm); color: var(--accent-ui);">Pourquoi mes macros ne s'affichent pas ?</h3>
                        <p style="color: var(--text-secondary); line-height: 1.8; margin: 0;">
                            Tu dois d'abord <strong>calculer tes macros</strong> dans l'onglet Calculateur. Une fois fait, elles s'affichent partout dans l'app (widget "Reste du jour", badges, etc.).
                        </p>
                    </div></div></div></div>

        <!-- Settings Tab -->
        <div id="settings" class="tab-content">
            <!-- Hero Header -->
            <div style="background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%); border-radius: var(--radius-xl); padding: var(--space-3xl); margin-bottom: var(--space-3xl); border: 1px solid rgba(255, 255, 255, 0.05); box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);">
                <div style="display: flex; align-items: center; gap: var(--space-lg);">
                    <div style="display: flex; align-items: center; justify-content: center; width: 60px; height: 60px; background: var(--accent-ui); border-radius: var(--radius-lg);"><i data-lucide="settings" style="width: 36px; height: 36px; color: white;"></i></div>
                    <div>
                        <h1 style="font-size: 2rem; font-weight: 700; margin: 0; color: var(--accent-ui);">Paramètres</h1>
                        <p style="margin: 0; margin-top: var(--space-xs); color: var(--text-secondary); font-size: 1rem;">Personnalise ton app et gère tes données</p>
                    </div></div></div>

            <!-- Lien Confidentialité -->
            <div class="card" style="background: rgba(5, 150, 105, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); padding: var(--space-lg); margin-bottom: var(--space-xl);">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: var(--space-md);">
                        <i data-lucide="shield-check" style="width: 24px; height: 24px; color: var(--accent-ui);"></i>
                        <div>
                            <h3 style="margin: 0; font-size: 1.1rem; font-weight: 700; color: var(--text-primary);">Tes données sont sécurisées</h3>
                            <p style="margin: 0; margin-top: 4px; font-size: 0.9rem; color: var(--text-secondary);">Stockage local + synchronisation cloud chiffrée (optionnelle)</p>
                        </div></div>
                    <button onclick="switchToTab('privacy')" class="btn" style="background: var(--accent-ui); color: white; white-space: nowrap;">En savoir plus</button>
                </div></div>

            <!-- Grille de paramètres -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: var(--space-xl); margin-bottom: var(--space-3xl);">

                <!-- Profil & Préférences (fusionnés) -->
                    <div class="card">
                        <div style="display: flex; align-items: center; gap: var(--space-md); margin-bottom: var(--space-lg); padding-bottom: var(--space-lg); border-bottom: 2px solid var(--bg-tertiary);">
                            <i data-lucide="user-cog" style="width: 24px; height: 24px; color: var(--accent-ui);"></i>
                            <h3 style="font-size: 1.3rem; font-weight: 700; color: var(--text-primary); margin: 0;">Profil & Préférences</h3>
                        </div>

                        <!-- Prénom -->
                        <div style="margin-bottom: var(--space-xl);">
                            <label style="display: block; font-weight: 600; font-size: 0.9rem; color: var(--text-primary); margin-bottom: var(--space-sm);">Prénom</label>
                            <div style="display: flex; gap: var(--space-sm);">
                                <input type="text" id="username-edit-input" maxlength="20" style="flex: 1; padding: var(--space-md); font-size: 1rem; background: var(--bg-tertiary); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: var(--radius-md); color: var(--text-primary);" placeholder="Ex: Jérémy">
                                <button onclick="updateUsername()" class="btn" style="background: var(--accent-ui); color: white; padding: var(--space-md) var(--space-lg);">
                                    <i data-lucide="check" style="width: 18px; height: 18px;"></i>
                                </button>
                            </div>
                            <div style="margin-top: var(--space-xs); font-size: 0.8rem; color: var(--text-secondary);">Affiché dans le header</div>
                        </div>

                        <!-- Thème -->
                        <div style="margin-bottom: var(--space-lg);">
                            <label style="display: block; font-weight: 600; font-size: 0.9rem; color: var(--text-primary); margin-bottom: var(--space-sm);">Thème</label>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-sm);">
                                <button id="theme-dark-btn" onclick="setTheme('dark')" class="btn" style="background: var(--accent-ui); color: white; display: flex; align-items: center; justify-content: center; gap: var(--space-sm); padding: var(--space-md);">
                                    <i data-lucide="moon" style="width: 18px; height: 18px;"></i>
                                    <span>Sombre</span>
                                </button>
                                <button id="theme-light-btn" onclick="setTheme('light')" class="btn" style="background: var(--bg-tertiary); color: var(--text-primary); border: 1px solid rgba(255, 255, 255, 0.1); display: flex; align-items: center; justify-content: center; gap: var(--space-sm); padding: var(--space-md);">
                                    <i data-lucide="sun" style="width: 18px; height: 18px;"></i>
                                    <span>Clair</span>
                                </button>
                            </div>
                        </div>

                        <!-- Installation PWA (inline) -->
                        <div id="pwa-install-inline" style="display: none; padding: var(--space-md); background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(78, 205, 196, 0.1) 100%); border-radius: var(--radius-md); border: 1px solid rgba(16, 185, 129, 0.2);">
                            <div style="display: flex; align-items: center; justify-content: space-between; gap: var(--space-md);">
                                <div style="display: flex; align-items: center; gap: var(--space-sm);">
                                    <i data-lucide="smartphone" style="width: 20px; height: 20px; color: var(--accent-main);"></i>
                                    <span style="font-size: 0.9rem; color: var(--text-primary);">Installer l'app</span>
                                </div>
                                <button onclick="installPWA()" class="btn" style="background: var(--accent-main); color: white; padding: var(--space-sm) var(--space-md); font-size: 0.85rem;">
                                    Installer
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Notifications -->
                    <div class="card">
                        <div style="display: flex; align-items: center; gap: var(--space-md); margin-bottom: var(--space-lg); padding-bottom: var(--space-lg); border-bottom: 2px solid var(--bg-tertiary);">
                            <i data-lucide="bell" style="width: 24px; height: 24px; color: var(--accent-ui);"></i>
                            <h3 style="font-size: 1.3rem; font-weight: 700; color: var(--text-primary); margin: 0;">Notifications</h3>
                        </div>

                        <!-- Statut permission -->
                        <div id="notification-permission-status" style="margin-bottom: var(--space-lg); padding: var(--space-md); border-radius: var(--radius-md); display: flex; align-items: center; gap: var(--space-sm);">
                        </div>

                        <!-- Bouton activer notifications -->
                        <button id="enable-notifications-btn" onclick="requestNotificationPermission()" class="btn" style="width: 100%; margin-bottom: var(--space-xl); background: var(--accent-ui); display: none;">
                            <i data-lucide="bell-ring" style="width: 18px; height: 18px;"></i>
                            Activer les notifications
                        </button>

                        <!-- Programmation des rappels -->
                        <div style="margin-bottom: var(--space-lg);">
                            <div style="font-weight: 600; font-size: 1rem; color: var(--text-primary); margin-bottom: var(--space-md);">
                                <i data-lucide="clock" style="width: 16px; height: 16px; display: inline; vertical-align: middle;"></i>
                                Rappels repas
                            </div>
                            <div id="notification-schedules" style="display: flex; flex-direction: column; gap: var(--space-md);">
                                <!-- Les rappels seront injectés ici -->
                            </div>
                        </div>

                        <!-- Objectifs atteints -->
                        <div style="display: flex; align-items: center; justify-content: space-between; padding: var(--space-md); background: var(--bg-tertiary); border-radius: var(--radius-md); margin-bottom: var(--space-lg);">
                            <div style="flex: 1;">
                                <div style="font-weight: 600; font-size: 0.95rem; color: var(--text-primary); margin-bottom: var(--space-xs);">Objectifs atteints</div>
                                <div style="font-size: 0.85rem; color: var(--text-secondary);">Notification quand tu atteins tes macros</div>
                            </div>
                            <label style="position: relative; display: inline-block; width: 50px; height: 26px; cursor: pointer;">
                                <input type="checkbox" id="notification-goals" checked style="opacity: 0; width: 0; height: 0;">
                                <span class="switch-bg"></span>
                                <span class="switch-knob"></span>
                            </label>
                        </div>

                        <!-- Bouton test -->
                        <button onclick="testNotification()" class="btn" style="width: 100%; background: var(--bg-tertiary); border: 1px solid rgba(255,255,255,0.1);">
                            <i data-lucide="send" style="width: 16px; height: 16px;"></i>
                            Tester les notifications
                        </button>
                    </div>

                <!-- Données -->
                    <div class="card">
                        <div style="display: flex; align-items: center; gap: var(--space-md); margin-bottom: var(--space-lg); padding-bottom: var(--space-lg); border-bottom: 2px solid var(--bg-tertiary);">
                            <i data-lucide="database" style="width: 24px; height: 24px; color: var(--accent-ui);"></i>
                            <h3 style="font-size: 1.3rem; font-weight: 700; color: var(--text-primary); margin: 0;">Mes Données</h3>
                        </div>

                        <!-- Stats -->
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md); margin-bottom: var(--space-lg); padding: var(--space-lg); background: var(--bg-tertiary); border-radius: var(--radius-md);">
                            <div style="text-align: center;">
                                <div style="font-size: 1.8rem; font-weight: 700; color: var(--accent-main);" id="stats-meals">0</div>
                                <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: var(--space-xs);">Repas</div></div>
                            <div style="text-align: center;">
                                <div style="font-size: 1.8rem; font-weight: 700; color: var(--accent-ui);" id="stats-foods">0</div>
                                <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: var(--space-xs);">Aliments</div></div>
                            <div style="text-align: center;">
                                <div style="font-size: 1.8rem; font-weight: 700; color: var(--accent-ui);" id="stats-tracking">0</div>
                                <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: var(--space-xs);">Suivis</div></div>
                            <div style="text-align: center;">
                                <div style="font-size: 1.8rem; font-weight: 700; color: var(--accent-ui);" id="stats-templates">0</div>
                                <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: var(--space-xs);">Repas types</div></div></div>

                        <!-- Export -->
                        <button class="btn" onclick="exportData()" style="width: 100%; background: var(--accent-ui); color: white; display: flex; align-items: center; justify-content: center; gap: var(--space-sm); margin-bottom: var(--space-sm);">
                            <i data-lucide="download" style="width: 18px; height: 18px;"></i>
                            Exporter mes données
                        </button>

                        <!-- Import -->
                        <button class="btn" onclick="document.getElementById('importFile').click()" style="width: 100%; background: var(--bg-tertiary); color: var(--text-primary); border: 1px solid rgba(255, 255, 255, 0.1); display: flex; align-items: center; justify-content: center; gap: var(--space-sm);">
                            <i data-lucide="upload" style="width: 18px; height: 18px;"></i>
                            Importer des données
                        </button>
                        <input type="file" id="importFile" accept=".json" style="display: none;" onchange="importData(event)">

                        <div style="margin-top: var(--space-md); padding: var(--space-md); background: rgba(5, 150, 105, 0.1); border-radius: var(--radius-md); border-left: 3px solid var(--accent-ui);">
                            <div style="display: flex; align-items: start; gap: var(--space-sm);">
                                <i data-lucide="info" style="width: 18px; height: 18px; color: var(--accent-ui); flex-shrink: 0; margin-top: 2px;"></i>
                                <span style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">Format JSON incluant repas, aliments, suivis et paramètres</span>
                            </div></div></div>

                    <!-- Synchronisation Cloud -->
                    <div class="card" id="firebase-sync-card">
                        <div style="display: flex; align-items: center; gap: var(--space-md); margin-bottom: var(--space-lg); padding-bottom: var(--space-lg); border-bottom: 2px solid var(--bg-tertiary);">
                            <i data-lucide="cloud" style="width: 24px; height: 24px; color: var(--accent-ui);"></i>
                            <h3 style="font-size: 1.3rem; font-weight: 700; color: var(--text-primary); margin: 0;">Sync Cloud</h3>
                        </div>

                        <div id="firebase-not-connected" style="margin-bottom: var(--space-lg);">
                            <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6; margin: 0 0 var(--space-lg) 0;">
                                Connecte-toi pour retrouver tes données sur tous tes appareils.
                            </p>
                            <button id="google-signin-btn" onclick="firebaseSignIn()" class="btn" style="width: 100%; background: #4285F4; color: white; display: flex; align-items: center; justify-content: center; gap: var(--space-sm); font-weight: 700;">
                                <svg style="width: 20px; height: 20px;" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#fff"/>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#fff"/>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fff"/>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#fff"/>
                                </svg>
                                Connexion avec Google
                            </button>
                        </div>

                        <div id="firebase-connected" style="display: none;">
                            <div style="display: flex; align-items: center; gap: var(--space-md); padding: var(--space-lg); background: rgba(16, 185, 129, 0.1); border-radius: var(--radius-md); margin-bottom: var(--space-lg);">
                                <img id="firebase-user-photo" src="" alt="Photo" style="width: 48px; height: 48px; border-radius: 50%; border: 2px solid var(--accent-main);">
                                <div style="flex: 1;">
                                    <div id="firebase-user-name" style="font-weight: 700; font-size: 1rem; color: var(--text-primary);"></div>
                                    <div id="firebase-user-email" style="font-size: 0.85rem; color: var(--text-secondary);"></div>
                                </div>
                                <div style="display: flex; align-items: center; gap: var(--space-xs); color: var(--accent-main);">
                                    <i data-lucide="check-circle" style="width: 18px; height: 18px;"></i>
                                    <span style="font-size: 0.85rem; font-weight: 600;">Sync</span>
                                </div>
                            </div>

                            <div id="firebase-sync-status" style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: var(--space-lg); text-align: center;">
                                Dernière sync: jamais
                            </div>

                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-sm); margin-bottom: var(--space-md);">
                                <button onclick="firebaseForceSync()" class="btn" style="background: var(--accent-ui); color: white; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: var(--space-md);" title="Envoie tes données locales vers le cloud">
                                    <div style="display: flex; align-items: center; gap: var(--space-xs);">
                                        <i data-lucide="upload-cloud" style="width: 18px; height: 18px;"></i>
                                        <span style="font-weight: 600;">Sauvegarder</span>
                                    </div>
                                    <span style="font-size: 0.7rem; opacity: 0.8;">Envoyer vers le cloud</span>
                                </button>
                                <button onclick="firebaseRestoreFromCloud()" class="btn" style="background: var(--bg-tertiary); color: var(--text-primary); border: 1px solid rgba(255, 255, 255, 0.1); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: var(--space-md);" title="Récupère tes données depuis le cloud (écrase les données locales)">
                                    <div style="display: flex; align-items: center; gap: var(--space-xs);">
                                        <i data-lucide="download-cloud" style="width: 18px; height: 18px;"></i>
                                        <span style="font-weight: 600;">Récupérer</span>
                                    </div>
                                    <span style="font-size: 0.7rem; opacity: 0.7;">Télécharger depuis le cloud</span>
                                </button>
                            </div>

                            <button onclick="firebaseSignOut()" class="btn-danger-outline btn-full">
                                <i data-lucide="log-out" class="icon-sm"></i>
                                Déconnexion
                            </button>
                        </div>

                        <div style="margin-top: var(--space-md); padding: var(--space-md); background: rgba(5, 150, 105, 0.1); border-radius: var(--radius-md); border-left: 3px solid var(--accent-ui);">
                            <div style="display: flex; align-items: start; gap: var(--space-sm);">
                                <i data-lucide="shield-check" style="width: 18px; height: 18px; color: var(--accent-ui); flex-shrink: 0; margin-top: 2px;"></i>
                                <span style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">Tes données sont chiffrées et stockées de manière sécurisée</span>
                            </div></div></div>

                    <!-- Préférences -->
                    <div class="card">
                        <div style="display: flex; align-items: center; gap: var(--space-md); margin-bottom: var(--space-lg); padding-bottom: var(--space-lg); border-bottom: 2px solid var(--bg-tertiary);">
                            <i data-lucide="sliders" style="width: 24px; height: 24px; color: var(--accent-ui);"></i>
                            <h3 style="font-size: 1.3rem; font-weight: 700; color: var(--text-primary); margin: 0;">Préférences</h3>
                        </div>

                        <div style="display: flex; flex-direction: column; gap: var(--space-lg);">

                            <!-- Auto-sauvegarde -->
                            <div style="display: flex; align-items: center; justify-content: space-between;">
                                <div style="flex: 1;">
                                    <div style="font-weight: 600; font-size: 0.95rem; color: var(--text-primary); margin-bottom: var(--space-xs);">Auto-sauvegarde</div>
                                    <div style="font-size: 0.85rem; color: var(--text-secondary);">Sauvegarder automatiquement chaque action</div></div>
                                <label style="position: relative; display: inline-block; width: 50px; height: 26px; cursor: pointer;">
                                    <input type="checkbox" id="pref-autosave" checked style="opacity: 0; width: 0; height: 0;">
                                    <span class="switch-bg" style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; border-radius: 26px; transition: 0.3s;"></span>
                                    <span class="switch-knob" style="position: absolute; content: .+; height: 18px; width: 18px; left: 4px; bottom: 4px; background: white; border-radius: 50%; transition: 0.3s;"></span>
                                </label>
                            </div>

                            <!-- Confirmation suppression -->
                            <div style="display: flex; align-items: center; justify-content: space-between;">
                                <div style="flex: 1;">
                                    <div style="font-weight: 600; font-size: 0.95rem; color: var(--text-primary); margin-bottom: var(--space-xs);">Confirmer suppressions</div>
                                    <div style="font-size: 0.85rem; color: var(--text-secondary);">Demander confirmation avant de supprimer</div></div>
                                <label style="position: relative; display: inline-block; width: 50px; height: 26px; cursor: pointer;">
                                    <input type="checkbox" id="pref-confirm" checked style="opacity: 0; width: 0; height: 0;">
                                    <span class="switch-bg" style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; border-radius: 26px; transition: 0.3s;"></span>
                                    <span class="switch-knob" style="position: absolute; content: .+; height: 18px; width: 18px; left: 4px; bottom: 4px; background: white; border-radius: 50%; transition: 0.3s;"></span>
                                </label>
                            </div></div></div>

                    <!-- Feedback -->
                    <div class="card" style="border: 1px solid rgba(99, 102, 241, 0.3); background: rgba(99, 102, 241, 0.05);">
                        <div style="display: flex; align-items: center; gap: var(--space-md); margin-bottom: var(--space-lg); padding-bottom: var(--space-lg); border-bottom: 2px solid rgba(99, 102, 241, 0.3);">
                            <i data-lucide="message-square" style="width: 24px; height: 24px; color: var(--accent-purple);"></i>
                            <h3 style="font-size: 1.3rem; font-weight: 700; color: var(--accent-purple); margin: 0;">Feedback</h3>
                        </div>

                        <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin-bottom: var(--space-lg);">
                            Tu as trouvé un bug ? Une idée d'amélioration ? Une question ? Envoie-nous ton feedback pour nous aider à améliorer NutriTrack.
                        </p>

                        <button class="btn" onclick="openFeedbackModal()" style="background: var(--accent-purple); color: white; width: 100%;">
                            <i data-lucide="send" style="width: 18px; height: 18px;"></i>
                            Envoyer un feedback
                        </button>
                    </div>

                    <!-- Zone Danger -->
                    <div class="card" style="border: 2px solid var(--accent-danger); background: rgba(239, 68, 68, 0.05);">
                        <div style="display: flex; align-items: center; gap: var(--space-md); margin-bottom: var(--space-lg); padding-bottom: var(--space-lg); border-bottom: 2px solid var(--accent-danger);">
                            <i data-lucide="alert-triangle" style="width: 24px; height: 24px; color: var(--accent-danger);"></i>
                            <h3 style="font-size: 1.3rem; font-weight: 700; color: var(--accent-danger); margin: 0;">Zone Dangereuse</h3>
                        </div>

                        <div class="alert-box alert-danger">
                            <div style="font-weight: 700; font-size: 1rem; color: var(--text-primary); margin-bottom: var(--space-xs);">Réinitialisation complète</div>
                            <div style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: var(--space-md);">
                                Supprime définitivement tous tes repas, aliments, suivis et paramètres. Cette action est irréversible.
                            </div>
                            <div style="font-size: 0.85rem; color: var(--text-secondary);">
                                <i data-lucide="lightbulb" class="icon-inline"></i> Pense à exporter tes données avant
                            </div></div>

                        <button class="btn btn-danger btn-full" onclick="resetAllData()">
                            <i data-lucide="trash-2" class="icon-inline"></i>
                            Tout supprimer
                        </button>
                    </div>
            </div>

            <!-- Méthodologie (section isolée en dessous) -->
            <div style="margin-bottom: var(--space-3xl);">
                    <!-- Méthodologie -->
                    <div class="card" style="background: var(--bg-secondary); border: 1px solid rgba(255, 255, 255, 0.05);">
                        <div style="display: flex; align-items: center; gap: var(--space-md); margin-bottom: var(--space-xl); padding-bottom: var(--space-lg); border-bottom: 2px solid var(--bg-tertiary);">
                            <i data-lucide="brain" style="width: 24px; height: 24px; color: var(--accent-ui);"></i>
                            <h3 style="font-size: 1.3rem; font-weight: 700; color: var(--text-primary); margin: 0;">Méthodologie de Calcul</h3>
                        </div>

                        <div style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.8; margin-bottom: var(--space-2xl);">
                            <p style="margin-bottom: var(--space-lg);">
                                Les calories sont estimées à partir du <strong style="color: var(--text-primary);">métabolisme de base (BMR)</strong> calculé via la <strong style="color: var(--text-primary);">formule Mifflin–St Jeor</strong>, reconnue pour sa fiabilité chez la majorité des adultes.
                            </p>
                            <p style="margin-bottom: var(--space-lg);">
                                Le métabolisme de base est ensuite ajusté selon ton <strong style="color: var(--text-primary);">niveau d'activité</strong> afin d'estimer ta dépense énergétique journalière (TDEE).
                            </p>
                            <p style="margin-bottom: var(--space-lg);">
                                Les macronutriments sont répartis selon des recommandations couramment utilisées en pratique sportive :
                            </p>
                            <ul style="margin-left: var(--space-2xl); margin-bottom: var(--space-lg);">
                                <li style="margin-bottom: var(--space-sm);"><strong style="color: var(--accent-protein);">Protéines :</strong> soutien de la masse musculaire et de la satiété</li>
                                <li style="margin-bottom: var(--space-sm);"><strong style="color: var(--accent-fat);">Lipides :</strong> santé hormonale et fonctions essentielles</li>
                                <li style="margin-bottom: var(--space-sm);"><strong style="color: var(--accent-carbs);">Glucides :</strong> performance, énergie et récupération</li>
                            </ul>
                            <p>
                                Des limites et avertissements sont intégrés afin d'éviter des configurations irréalistes ou contre-productives.
                            </p>
                        </div>

                        <div style="padding: var(--space-lg); background: rgba(239, 68, 68, 0.1); border-left: 3px solid var(--accent-danger); border-radius: var(--radius-md);">
                            <div style="display: flex; align-items: start; gap: var(--space-md);">
                                <i data-lucide="alert-circle" style="width: 20px; height: 20px; color: var(--accent-danger); flex-shrink: 0; margin-top: 2px;"></i>
                                <div>
                                    <div style="font-weight: 700; color: var(--accent-danger); margin-bottom: var(--space-xs);">Avertissement</div>
                                    <p style="margin: 0; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6;">
                                        Cet outil fournit des estimations nutritionnelles à titre informatif. Il ne remplace pas un suivi médical ou diététique personnalisé. En cas de pathologie, trouble alimentaire ou objectif spécifique, consulte un professionnel de santé.
                                    </p>
                                </div></div></div></div></div></div>

            <!-- CSS pour les toggles -->
            <style>
                .switch-bg {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: var(--bg-tertiary) !important;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 26px;
                    transition: 0.3s;
                }

                .switch-knob {
                    position: absolute;
                    height: 18px;
                    width: 18px;
                    left: 4px !important;
                    bottom: 4px;
                    background: white;
                    border-radius: 50%;
                    transition: 0.3s;
                }

                input[type="checkbox"]:checked + .switch-bg {
                    background: var(--accent-ui) !important;
                    border-color: var(--accent-ui);
                }

                input[type="checkbox"]:checked + .switch-bg + .switch-knob {
                    transform: translateX(24px) !important;
                    left: 4px !important;
                }

                @media (max-width: 1024px) {
                    #settings > div:first-of-type {
                        grid-template-columns: 1fr !important;
                    }
                }

        /* Sections désactivées tant que macros pas calculées */


        .section-disabled-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: transparent;
            pointer-events: all;
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: var(--space-xl);
        }

        .section-disabled-message {
            background: var(--bg-secondary);
            padding: var(--space-3xl);
            border-radius: var(--radius-xl);
            text-align: center;
            max-width: 500px;
            border: 1px solid rgba(16, 185, 129, 0.2);
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
            pointer-events: all;
        }

        /* Mobile: FIX pour overlay sections désactivées */
        @media (max-width: 768px) {
            .section-disabled-overlay {
                z-index: 50 !important;
                bottom: 85px !important;
                pointer-events: none !important;
            }

            .section-disabled-message {
                pointer-events: all !important;
            }
        }
    </style>

            <!-- JS pour calculer les stats -->
            <script>
                // Calculer les stats au chargement de settings
                function updateSettingsStats() {
                    // Compter les repas (1 repas = 1 case avec au moins 1 aliment, max 4 par jour)
                    const allMeals = JSON.parse(localStorage.getItem('allDailyMeals') || '{}');
                    let mealCount = 0;
                    Object.values(allMeals).forEach(day => {
                        ['breakfast', 'lunch', 'snack', 'dinner'].forEach(mealType => {
                            // Si le repas a au moins 1 aliment, ça compte comme 1 repas
                            if (day[mealType] && day[mealType].foods && day[mealType].foods.length > 0) {
                                mealCount += 1; // Compte le repas, pas les aliments individuels
                            }
                        });
                    });
                    document.getElementById('stats-meals').textContent = mealCount;

                    // Compter les aliments custom
                    const customFoods = JSON.parse(localStorage.getItem('customFoods') || '[]');
                    document.getElementById('stats-foods').textContent = customFoods.length;

                    // Compter les suivis corporels
                    const tracking = JSON.parse(localStorage.getItem('trackingData') || '[]');
                    document.getElementById('stats-tracking').textContent = tracking.length;

                    // Compter les repas types (templates)
                    const templates = JSON.parse(localStorage.getItem('mealTemplates') || '[]');
                    document.getElementById('stats-templates').textContent = templates.length;
                }

                // Appeler au changement d'onglet et au chargement
                document.addEventListener('DOMContentLoaded', () => {
                    const settingsBtn = document.querySelector('[data-tab="settings"]');
                    if (settingsBtn) { settingsBtn.addEventListener('click', updateSettingsStats); }
                });
            </script>

    <!-- À PROPOS -->
    <div id="about" class="tab-content">
        <div style="background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%); border-radius: var(--radius-xl); padding: var(--space-3xl); margin-bottom: var(--space-3xl); border: 1px solid rgba(255, 255, 255, 0.05); box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);">
            <div style="display: flex; align-items: center; gap: var(--space-lg); margin-bottom: var(--space-lg);">
                <div style="font-size: 3rem; display: flex; align-items: center; justify-content: center; width: 60px; height: 60px; background: var(--accent-ui); border-radius: var(--radius-lg);"><i data-lucide="info" style="width: 36px; height: 36px; color: white;"></i></div>
                <div>
                    <h1 style="font-size: 2rem; font-weight: 700; margin: 0; color: var(--accent-ui);">
                        À Propos de NutriTrack
                    </h1>
                    <p style="margin: 0; margin-top: var(--space-xs); color: var(--text-secondary); font-size: 1rem;">
                        Ton compagnon nutritionnel 100% gratuit et privé
                    </p>
                </div></div></div>

        <div class="card">
            <h2 style="font-size: 1.6rem; font-weight: 700; margin-bottom: var(--space-xl); color: var(--text-primary);"><i data-lucide="heart" class="icon-inline"></i> Notre Mission</h2>

            <p style="line-height: 1.8; margin-bottom: var(--space-xl); color: var(--text-secondary);">
                NutriTrack est une application web gratuite créée avec passion pour t'aider à atteindre tes objectifs nutritionnels. Que tu sois en prise de masse, en sèche, ou simplement soucieux de ton alimentation, NutriTrack te fournit les outils nécessaires pour suivre tes macros, planifier tes repas et progresser vers tes objectifs.
            </p>

            <div style="background: rgba(16, 185, 129, 0.05); border-left: 3px solid rgba(16, 185, 129, 0.4); border-radius: var(--radius-md); padding: var(--space-xl); margin-bottom: var(--space-2xl);">
                <p style="margin: 0; font-size: 1.05rem; line-height: 1.8; color: var(--text-primary); font-weight: 500;">
                    <strong>Notre philosophie :</strong> Rendre le tracking nutritionnel simple, accessible et sécurisé. Pas de tracking publicitaire. Juste un outil efficace qui te respecte.
                </p>
            </div>

            <h3 style="font-size: 1.3rem; font-weight: 700; margin-top: var(--space-2xl); margin-bottom: var(--space-md); color: var(--text-primary);"><i data-lucide="shield-check" class="icon-inline"></i> Sécurisé</h3>
            <p style="line-height: 1.8; margin-bottom: var(--space-xl); color: var(--text-secondary);">
                Par défaut, tes données sont stockées <strong>localement dans ton navigateur</strong>. En te connectant avec Google, tu peux synchroniser tes données de manière sécurisée sur Firebase (Google Cloud) pour les retrouver sur tous tes appareils. Aucun tracking publicitaire, aucune vente de données.
            </p>

            <h3 style="font-size: 1.3rem; font-weight: 700; margin-top: var(--space-2xl); margin-bottom: var(--space-md); color: var(--text-primary);"><i data-lucide="zap" class="icon-inline"></i> 100% Gratuit</h3>
            <p style="line-height: 1.8; margin-bottom: var(--space-xl); color: var(--text-secondary);">
                NutriTrack est et restera <strong>totalement gratuit</strong>. Pas d'abonnement premium, pas de fonctionnalités payantes cachées, pas de publicité. Toutes les fonctionnalités sont accessibles immédiatement, sans limite.
            </p>

            <h3 style="font-size: 1.3rem; font-weight: 700; margin-top: var(--space-2xl); margin-bottom: var(--space-md); color: var(--text-primary);"><i data-lucide="users" class="icon-inline"></i> Créateur</h3>
            <p style="line-height: 1.8; margin-bottom: var(--space-xl); color: var(--text-secondary);">
                NutriTrack a été créé par <strong>Jérémy Mathurel</strong>, développeur passionné par la nutrition et le fitness. Le projet est né du besoin d'avoir un outil simple, efficace et respectueux de la vie privée pour suivre ses macros au quotidien.
            </p>

            <h3 style="font-size: 1.3rem; font-weight: 700; margin-top: var(--space-2xl); margin-bottom: var(--space-md); color: var(--text-primary);"><i data-lucide="mail" class="icon-inline"></i> Contact</h3>
            <p style="line-height: 1.8; margin-bottom: var(--space-md); color: var(--text-secondary);">
                Une question, un bug à signaler, ou simplement un retour à partager ?
            </p>
            <div style="background: var(--bg-tertiary); border-radius: var(--radius-md); padding: var(--space-lg); display: inline-flex; align-items: center; gap: var(--space-sm);">
                <i data-lucide="mail" style="width: 18px; height: 18px; color: var(--accent-ui);"></i>
                <a href="mailto:contact.nutritrack@gmail.com" style="color: var(--accent-ui);">contact.nutritrack@gmail.com</a>
            </div>

            <h3 style="font-size: 1.3rem; font-weight: 700; margin-top: var(--space-2xl); margin-bottom: var(--space-md); color: var(--text-primary);"><i data-lucide="code" class="icon-inline"></i> Version & Mises à Jour</h3>
            <p style="line-height: 1.8; margin-bottom: var(--space-md); color: var(--text-secondary);">
                <strong>Version actuelle :</strong> 3.0<br>
                <strong>Dernière mise à jour :</strong> Décembre 2025<br>
                <strong>Statut :</strong> Stable & maintenu activement
            </p>

            <h3 style="font-size: 1.3rem; font-weight: 700; margin-top: var(--space-2xl); margin-bottom: var(--space-md); color: var(--text-primary);"><i data-lucide="sparkles" class="icon-inline"></i> Fonctionnalités Principales</h3>
            <ul style="line-height: 1.8; color: var(--text-secondary); padding-left: var(--space-xl);">
                <li><strong>Calculateur de macros</strong> basé sur des formules scientifiques reconnues</li>
                <li><strong>Base de données alimentaire</strong> avec plus de 100 aliments</li>
                <li><strong>Aliments personnalisés</strong> pour ajouter tes propres recettes</li>
                <li><strong>Planning hebdomadaire</strong> pour organiser tes repas</li>
                <li><strong>Repas types</strong> pour gagner du temps</li>
                <li><strong>Suivi avancé</strong> avec graphiques d'évolution</li>
                <li><strong>Export/Import</strong> de tes données pour sauvegarde</li>
                <li><strong>Mode sombre/clair</strong> pour ton confort visuel</li>
            </ul>
        </div></div>

    <!-- CGU (Conditions Générales d'Utilisation) -->
    <div id="terms" class="tab-content">
        <div style="background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%); border-radius: var(--radius-xl); padding: var(--space-3xl); margin-bottom: var(--space-3xl); border: 1px solid rgba(255, 255, 255, 0.05); box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);">
            <div style="display: flex; align-items: center; gap: var(--space-lg); margin-bottom: var(--space-lg);">
                <div style="font-size: 3rem; display: flex; align-items: center; justify-content: center; width: 60px; height: 60px; background: var(--accent-ui); border-radius: var(--radius-lg);"><i data-lucide="file-text" style="width: 36px; height: 36px; color: white;"></i></div>
                <div>
                    <h1 style="font-size: 2rem; font-weight: 700; margin: 0; color: var(--accent-ui);">
                        Conditions Générales d'Utilisation
                    </h1>
                    <p style="margin: 0; margin-top: var(--space-xs); color: var(--text-secondary); font-size: 1rem;">
                        En vigueur au 1er décembre 2025
                    </p>
                </div></div></div>

        <div class="card">
            <div style="background: rgba(16, 185, 129, 0.05); border-left: 3px solid rgba(16, 185, 129, 0.4); border-radius: var(--radius-md); padding: var(--space-xl); margin-bottom: var(--space-2xl);">
                <p style="margin: 0; line-height: 1.8; color: var(--text-primary); font-weight: 500;">
                    Les présentes Conditions Générales d'Utilisation (CGU) régissent l'utilisation de l'application web NutriTrack. En accédant et en utilisant NutriTrack, tu acceptes sans réserve l'ensemble de ces conditions.
                </p>
            </div>

            <h2 style="font-size: 1.6rem; font-weight: 700; margin-bottom: var(--space-xl); color: var(--text-primary);">Article 1 - Objet</h2>
            <p style="line-height: 1.8; margin-bottom: var(--space-xl); color: var(--text-secondary);">
                NutriTrack est une application web gratuite de suivi nutritionnel et de calcul de macronutriments. Elle permet aux utilisateurs de calculer leurs besoins caloriques, suivre leurs repas, et gérer leur alimentation au quotidien.
            </p>

            <h2 style="font-size: 1.6rem; font-weight: 700; margin-bottom: var(--space-xl); color: var(--text-primary);">Article 2 - Acceptation des Conditions</h2>
            <p style="line-height: 1.8; margin-bottom: var(--space-xl); color: var(--text-secondary);">
                L'utilisation de NutriTrack implique l'acceptation pleine et entière des présentes CGU. Si tu n'acceptes pas ces conditions, tu dois cesser immédiatement d'utiliser l'application.
            </p>

            <h2 style="font-size: 1.6rem; font-weight: 700; margin-bottom: var(--space-xl); color: var(--text-primary);">Article 3 - Accès au Service</h2>
            <p style="line-height: 1.8; margin-bottom: var(--space-xl); color: var(--text-secondary);">
                <strong>3.1 Gratuité :</strong> L'accès à NutriTrack est entièrement gratuit. Aucun compte utilisateur n'est requis, aucun abonnement n'est nécessaire.<br><br>
                <strong>3.2 Disponibilité :</strong> NutriTrack est accessible 24h/24 et 7j/7, sous réserve des opérations de maintenance. Nous ne garantissons pas une disponibilité ininterrompue du service.<br><br>
                <strong>3.3 Compatibilité :</strong> L'application fonctionne sur les navigateurs web modernes (Chrome, Firefox, Safari, Edge). Il est de ta responsabilité de t'assurer que ton équipement est compatible.
            </p>

            <h2 style="font-size: 1.6rem; font-weight: 700; margin-bottom: var(--space-xl); color: var(--text-primary);">Article 4 - Utilisation de l'Application</h2>
            <p style="line-height: 1.8; margin-bottom: var(--space-xl); color: var(--text-secondary);">
                <strong>4.1 Usage personnel :</strong> NutriTrack est destinée à un usage personnel et non commercial. Toute utilisation commerciale est interdite sans autorisation écrite préalable.<br><br>
                <strong>4.2 Responsabilité de l'utilisateur :</strong> Tu es seul responsable de l'utilisation que tu fais de l'application, des données que tu y saisis, et des décisions que tu prends sur la base des informations fournies.<br><br>
                <strong>4.3 Données personnelles :</strong> Toutes tes données sont stockées localement dans ton navigateur. Tu es responsable de leur sauvegarde via la fonction d'export disponible dans l'application.
            </p>

            <h2 style="font-size: 1.6rem; font-weight: 700; margin-bottom: var(--space-xl); color: var(--text-primary);">Article 5 - Propriété Intellectuelle</h2>
            <p style="line-height: 1.8; margin-bottom: var(--space-xl); color: var(--text-secondary);">
                <strong>5.1 Droits d'auteur :</strong> NutriTrack, incluant son code source, son design, ses textes, ses logos et tous les éléments qui la composent, est la propriété exclusive de Jérémy Mathurel.<br><br>
                <strong>5.2 Restrictions :</strong> Toute reproduction, représentation, modification, publication, adaptation, totale ou partielle, de NutriTrack, par quelque procédé que ce soit, est strictement interdite sans autorisation écrite préalable de l'éditeur.<br><br>
                <strong>5.3 Interdictions :</strong> Il est notamment interdit de :
            </p>
            <ul style="line-height: 1.8; margin-bottom: var(--space-xl); color: var(--text-secondary); padding-left: var(--space-xl);">
                <li>Copier, modifier ou distribuer le code source</li>
                <li>Créer des œuvres dérivées</li>
                <li>Utiliser l'application à des fins commerciales sans autorisation</li>
                <li>Retirer ou modifier les mentions de propriété intellectuelle</li>
            </ul>

            <h2 style="font-size: 1.6rem; font-weight: 700; margin-bottom: var(--space-xl); color: var(--text-primary);">Article 6 - Limitation de Responsabilité</h2>
            <p style="line-height: 1.8; margin-bottom: var(--space-xl); color: var(--text-secondary);">
                <strong>6.1 Information :</strong> NutriTrack fournit des informations et des outils à titre purement informatif. L'application ne remplace en aucun cas l'avis d'un professionnel de santé qualifié.<br><br>
                <strong>6.2 Calculs :</strong> Les calculs de besoins caloriques et de macronutriments sont basés sur des formules scientifiques reconnues mais restent des estimations. Nous ne garantissons pas leur exactitude absolue.<br><br>
                <strong>6.3 Exclusion de responsabilité :</strong> En utilisant NutriTrack, tu reconnais que :
            </p>
            <ul style="line-height: 1.8; margin-bottom: var(--space-xl); color: var(--text-secondary); padding-left: var(--space-xl);">
                <li>L'application est fournie "en l'état"</li>
                <li>Nous ne pouvons être tenus responsables des dommages directs ou indirects résultant de son utilisation</li>
                <li>Tu es seul responsable de tes choix alimentaires et de santé</li>
                <li>Nous ne sommes pas responsables de la perte de données stockées localement</li>
            </ul>

            <h2 style="font-size: 1.6rem; font-weight: 700; margin-bottom: var(--space-xl); color: var(--text-primary);">Article 7 - Modifications de l'Application</h2>
            <p style="line-height: 1.8; margin-bottom: var(--space-xl); color: var(--text-secondary);">
                Nous nous réservons le droit de modifier, suspendre ou interrompre tout ou partie de NutriTrack à tout moment, sans préavis et sans que notre responsabilité puisse être engagée.
            </p>

            <h2 style="font-size: 1.6rem; font-weight: 700; margin-bottom: var(--space-xl); color: var(--text-primary);">Article 8 - Modifications des CGU</h2>
            <p style="line-height: 1.8; margin-bottom: var(--space-xl); color: var(--text-secondary);">
                Les présentes CGU peuvent être modifiées à tout moment. Les modifications entrent en vigueur dès leur mise en ligne. Il est conseillé de consulter régulièrement cette page pour prendre connaissance des éventuelles modifications.
            </p>

            <h2 style="font-size: 1.6rem; font-weight: 700; margin-bottom: var(--space-xl); color: var(--text-primary);">Article 9 - Droit Applicable et Juridiction</h2>
            <p style="line-height: 1.8; margin-bottom: var(--space-xl); color: var(--text-secondary);">
                Les présentes CGU sont régies par le droit français. En cas de litige, et à défaut d'accord amiable, les tribunaux français seront seuls compétents.
            </p>

            <h2 style="font-size: 1.6rem; font-weight: 700; margin-bottom: var(--space-xl); color: var(--text-primary);">Article 10 - Contact</h2>
            <p style="line-height: 1.8; color: var(--text-secondary);">
                Pour toute question relative aux présentes CGU, tu peux nous contacter à l'adresse suivante :<br>
                <strong>Email :</strong> <a href="mailto:contact.nutritrack@gmail.com" style="color: var(--accent-ui);">contact.nutritrack@gmail.com</a>
            </p>
        </div></div>

    <!-- MENTIONS LÉGALES -->
    <div id="legal" class="tab-content">
        <div style="background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%); border-radius: var(--radius-xl); padding: var(--space-3xl); margin-bottom: var(--space-3xl); border: 1px solid rgba(255, 255, 255, 0.05); box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);">
            <div style="display: flex; align-items: center; gap: var(--space-lg); margin-bottom: var(--space-lg);">
                <div style="font-size: 3rem; display: flex; align-items: center; justify-content: center; width: 60px; height: 60px; background: var(--accent-ui); border-radius: var(--radius-lg);"><i data-lucide="scale" style="width: 36px; height: 36px; color: white;"></i></div>
                <div>
                    <h1 style="font-size: 2rem; font-weight: 700; margin: 0; color: var(--accent-ui);">
                        Mentions Légales
                    </h1>
                    <p style="margin: 0; margin-top: var(--space-xs); color: var(--text-secondary); font-size: 1rem;">
                        Conformément aux articles 6-III et 19 de la Loi n° 2004-575 du 21 juin 2004
                    </p>
                </div></div></div>

        <div class="card">
            <h2 style="font-size: 1.6rem; font-weight: 700; margin-bottom: var(--space-xl); color: var(--text-primary);"><i data-lucide="user" class="icon-inline"></i> Éditeur de l'Application</h2>
            <p style="line-height: 1.8; margin-bottom: var(--space-xl); color: var(--text-secondary);">
                <strong>Nom de l'application :</strong> NutriTrack<br>
                <strong>Version :</strong> 3.0<br>
                <strong>Type :</strong> Application Web Progressive (PWA)<br>
                <strong>Mise à jour :</strong> Décembre 2025
            </p>
            <p style="line-height: 1.8; margin-bottom: var(--space-xl); color: var(--text-secondary);">
                <strong>Éditeur :</strong> Jérémy Mathurel<br>
                <strong>Statut :</strong> Particulier<br>
                <strong>Pays :</strong> France<br>
                <strong>Email :</strong> <a href="mailto:contact.nutritrack@gmail.com" style="color: var(--accent-ui);">contact.nutritrack@gmail.com</a>
            </p>

            <h2 style="font-size: 1.6rem; font-weight: 700; margin-bottom: var(--space-xl); color: var(--text-primary);"><i data-lucide="server" class="icon-inline"></i> Hébergement</h2>
            <p style="line-height: 1.8; margin-bottom: var(--space-xl); color: var(--text-secondary);">
                <strong>Hébergeur :</strong> Netlify, Inc.<br>
                <strong>Adresse :</strong> 44 Montgomery Street, Suite 300, San Francisco, CA 94104, États-Unis<br>
                <strong>Site web :</strong> <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer" style="color: var(--accent-ui); text-decoration: none;">www.netlify.com</a>
            </p>
            <div style="background: rgba(16, 185, 129, 0.05); border-left: 3px solid rgba(16, 185, 129, 0.4); border-radius: var(--radius-md); padding: var(--space-lg); margin-bottom: var(--space-2xl);">
                <p style="margin: 0; line-height: 1.8; color: var(--text-primary); font-weight: 500;">
                    <strong>Note importante :</strong> Par défaut, NutriTrack stocke les données localement. Si tu te connectes avec Google, tes données sont synchronisées sur Firebase (Google Cloud) de manière sécurisée.
                </p>
            </div>

            <h2 style="font-size: 1.6rem; font-weight: 700; margin-bottom: var(--space-xl); color: var(--text-primary);"><i data-lucide="shield" class="icon-inline"></i> Propriété Intellectuelle</h2>
            <p style="line-height: 1.8; margin-bottom: var(--space-xl); color: var(--text-secondary);">
                L'ensemble du contenu de NutriTrack (structure, textes, logos, images, code source, base de données) est la propriété exclusive de Jérémy Mathurel, sauf mention contraire.
            </p>
            <p style="line-height: 1.8; margin-bottom: var(--space-xl); color: var(--text-secondary);">
                Toute reproduction, distribution, modification, adaptation, retransmission ou publication de ces différents éléments est strictement interdite sans l'accord exprès et écrit de Jérémy Mathurel.
            </p>
            <p style="line-height: 1.8; margin-bottom: var(--space-xl); color: var(--text-secondary);">
                <strong>Icônes :</strong> Les icônes utilisées proviennent de <a href="https://lucide.dev" target="_blank" rel="noopener noreferrer" style="color: var(--accent-ui); text-decoration: none;">Lucide Icons</a> (licence ISC).
            </p>

            <h2 style="font-size: 1.6rem; font-weight: 700; margin-bottom: var(--space-xl); color: var(--text-primary);"><i data-lucide="cookie" class="icon-inline"></i> Cookies et Stockage</h2>
            <p style="line-height: 1.8; margin-bottom: var(--space-xl); color: var(--text-secondary);">
                <strong>Pas de cookies de tracking :</strong> NutriTrack n'utilise aucun cookie de suivi, aucun cookie publicitaire, ni aucun cookie tiers.
            </p>
            <p style="line-height: 1.8; margin-bottom: var(--space-xl); color: var(--text-secondary);">
                <strong>Stockage local (localStorage) :</strong> Par défaut, l'application stocke tes données dans le localStorage de ton navigateur.
            </p>
            <p style="line-height: 1.8; margin-bottom: var(--space-xl); color: var(--text-secondary);">
                <strong>Synchronisation cloud (optionnelle) :</strong> Si tu te connectes avec Google, tes données sont également stockées sur Firebase Firestore (Google Cloud Platform) pour permettre la synchronisation entre appareils.
            </p>

            <h2 style="font-size: 1.6rem; font-weight: 700; margin-bottom: var(--space-xl); color: var(--text-primary);"><i data-lucide="shield-check" class="icon-inline"></i> Données Personnelles (RGPD)</h2>
            <p style="line-height: 1.8; margin-bottom: var(--space-xl); color: var(--text-secondary);">
                <strong>Conformité RGPD :</strong> NutriTrack respecte le Règlement Général sur la Protection des Données (RGPD) en vigueur depuis le 25 mai 2018.
            </p>
            <p style="line-height: 1.8; margin-bottom: var(--space-xl); color: var(--text-secondary);">
                <strong>Collecte de données :</strong> Les informations que tu saisis (prénom, poids, objectifs, repas) sont stockées localement. Si tu te connectes, elles sont également synchronisées sur Firebase pour ton usage personnel uniquement.
            </p>
            <p style="line-height: 1.8; margin-bottom: var(--space-xl); color: var(--text-secondary);">
                <strong>Responsable du traitement :</strong> Jérémy Mathurel est responsable du traitement pour les données synchronisées sur Firebase. Contact : contact.nutritrack@gmail.com
            </p>
            <p style="line-height: 1.8; margin-bottom: var(--space-xl); color: var(--text-secondary);">
                <strong>Tes droits :</strong> Tu as le contrôle total sur tes données :
            </p>
            <ul style="line-height: 1.8; margin-bottom: var(--space-xl); color: var(--text-secondary); padding-left: var(--space-xl);">
                <li><strong>Droit d'accès :</strong> Toutes tes données sont visibles dans l'application</li>
                <li><strong>Droit de modification :</strong> Tu peux modifier toutes tes données à tout moment</li>
                <li><strong>Droit à l'effacement :</strong> Tu peux supprimer toutes tes données via les Paramètres</li>
                <li><strong>Droit à la portabilité :</strong> Tu peux exporter toutes tes données au format JSON</li>
            </ul>

            <h2 style="font-size: 1.6rem; font-weight: 700; margin-bottom: var(--space-xl); color: var(--text-primary);"><i data-lucide="globe" class="icon-inline"></i> Liens Externes</h2>
            <p style="line-height: 1.8; margin-bottom: var(--space-xl); color: var(--text-secondary);">
                NutriTrack peut contenir des liens vers des sites externes (ex: sources scientifiques dans le Guide). Ces liens sont fournis à titre informatif uniquement. Nous ne sommes pas responsables du contenu de ces sites tiers.
            </p>

            <h2 style="font-size: 1.6rem; font-weight: 700; margin-bottom: var(--space-xl); color: var(--text-primary);"><i data-lucide="scale" class="icon-inline"></i> Droit Applicable</h2>
            <p style="line-height: 1.8; margin-bottom: var(--space-xl); color: var(--text-secondary);">
                Les présentes mentions légales sont régies par le droit français. En cas de litige et à défaut d'accord amiable, le litige sera porté devant les tribunaux français conformément aux règles de compétence en vigueur.
            </p>

            <h2 style="font-size: 1.6rem; font-weight: 700; margin-bottom: var(--space-xl); color: var(--text-primary);"><i data-lucide="edit" class="icon-inline"></i> Crédits</h2>
            <p style="line-height: 1.8; color: var(--text-secondary);">
                <strong>Conception & Développement :</strong> Jérémy Mathurel<br>
                <strong>Design :</strong> Jérémy Mathurel<br>
                <strong>Icônes :</strong> <a href="https://lucide.dev" target="_blank" rel="noopener noreferrer" style="color: var(--accent-ui); text-decoration: none;">Lucide Icons</a><br>
                <strong>Polices :</strong> Google Fonts (DM Sans, Inter)<br>
                <strong>Hébergement :</strong> Netlify
            </p>
        </div></div>

    <!-- ADMIN PANEL (visible uniquement pour l'admin) -->
    <div id="admin" class="tab-content">
        <div style="background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%); border-radius: var(--radius-xl); padding: var(--space-3xl); margin-bottom: var(--space-3xl); border: 1px solid rgba(255, 255, 255, 0.05); box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);">
            <div style="display: flex; align-items: center; gap: var(--space-lg); margin-bottom: var(--space-lg);">
                <div style="font-size: 3rem; display: flex; align-items: center; justify-content: center; width: 60px; height: 60px; background: var(--accent-purple); border-radius: var(--radius-lg);"><i data-lucide="shield" style="width: 36px; height: 36px; color: white;"></i></div>
                <div>
                    <h1 style="font-size: 2rem; font-weight: 700; margin: 0; color: var(--accent-purple);">
                        Panel Admin
                    </h1>
                    <p style="margin: 0; margin-top: var(--space-xs); color: var(--text-secondary); font-size: 1rem;">
                        Gestion complète de l'application
                    </p>
                </div></div></div>

        <!-- Sous-navigation Admin -->
        <div class="admin-subnav" style="display: flex; gap: var(--space-sm); margin-bottom: var(--space-2xl); background: var(--bg-secondary); padding: var(--space-md); border-radius: var(--radius-lg); overflow-x: auto; flex-wrap: wrap;">
            <button onclick="showAdminSection('dashboard')" class="admin-subnav-btn active" data-section="dashboard" style="padding: var(--space-md) var(--space-lg); background: var(--accent-purple); color: white; border: none; border-radius: var(--radius-md); font-weight: 600; cursor: pointer; transition: all 0.2s; white-space: nowrap;">
                <i data-lucide="layout-dashboard" style="width: 16px; height: 16px; margin-right: 6px;"></i> Dashboard
            </button>
            <button onclick="showAdminSection('feedbacks')" class="admin-subnav-btn" data-section="feedbacks" style="padding: var(--space-md) var(--space-lg); background: var(--bg-tertiary); color: var(--text-secondary); border: none; border-radius: var(--radius-md); font-weight: 600; cursor: pointer; transition: all 0.2s; white-space: nowrap;">
                <i data-lucide="message-square" style="width: 16px; height: 16px; margin-right: 6px;"></i> Feedbacks
            </button>
            <button onclick="showAdminSection('users')" class="admin-subnav-btn" data-section="users" style="padding: var(--space-md) var(--space-lg); background: var(--bg-tertiary); color: var(--text-secondary); border: none; border-radius: var(--radius-md); font-weight: 600; cursor: pointer; transition: all 0.2s; white-space: nowrap;">
                <i data-lucide="users" style="width: 16px; height: 16px; margin-right: 6px;"></i> Utilisateurs
            </button>
            <button onclick="showAdminSection('foods')" class="admin-subnav-btn" data-section="foods" style="padding: var(--space-md) var(--space-lg); background: var(--bg-tertiary); color: var(--text-secondary); border: none; border-radius: var(--radius-md); font-weight: 600; cursor: pointer; transition: all 0.2s; white-space: nowrap;">
                <i data-lucide="apple" style="width: 16px; height: 16px; margin-right: 6px;"></i> Aliments
            </button>
            <button onclick="showAdminSection('settings')" class="admin-subnav-btn" data-section="settings" style="padding: var(--space-md) var(--space-lg); background: var(--bg-tertiary); color: var(--text-secondary); border: none; border-radius: var(--radius-md); font-weight: 600; cursor: pointer; transition: all 0.2s; white-space: nowrap;">
                <i data-lucide="settings" style="width: 16px; height: 16px; margin-right: 6px;"></i> Paramètres
            </button>
        </div>

        <!-- SECTION: Dashboard -->
        <div id="admin-section-dashboard" class="admin-section">
            <!-- Stats globales -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-md); margin-bottom: var(--space-xl);" id="dashboard-stats">
                <div class="card" style="text-align: center; padding: var(--space-lg);">
                    <div style="font-size: 2.5rem; font-weight: 700; color: var(--accent-ui);" id="stat-users-total">0</div>
                    <div style="font-size: 0.85rem; color: var(--text-secondary);">Utilisateurs</div>
                </div>
                <div class="card" style="text-align: center; padding: var(--space-lg);">
                    <div style="font-size: 2.5rem; font-weight: 700; color: var(--accent-main);" id="stat-users-active">0</div>
                    <div style="font-size: 0.85rem; color: var(--text-secondary);">Actifs (7j)</div>
                </div>
                <div class="card" style="text-align: center; padding: var(--space-lg);">
                    <div style="font-size: 2.5rem; font-weight: 700; color: var(--accent-danger);" id="stat-feedbacks-unresolved">0</div>
                    <div style="font-size: 0.85rem; color: var(--text-secondary);">Feedbacks non résolus</div>
                </div>
                <div class="card" style="text-align: center; padding: var(--space-lg);">
                    <div style="font-size: 2.5rem; font-weight: 700; color: var(--accent-protein);" id="stat-foods-total">0</div>
                    <div style="font-size: 0.85rem; color: var(--text-secondary);">Aliments communs</div>
                </div>
            </div>

            <!-- 5 derniers feedbacks -->
            <div class="card">
                <h2 style="font-size: 1.3rem; font-weight: 700; margin-bottom: var(--space-lg); color: var(--text-primary); display: flex; align-items: center; gap: var(--space-sm);">
                    <i data-lucide="inbox" style="width: 22px; height: 22px;"></i>
                    <span>Derniers Feedbacks</span>
                </h2>
                <div id="dashboard-recent-feedbacks">
                    <div style="text-align: center; color: var(--text-secondary); padding: var(--space-2xl);">
                        <i data-lucide="loader" style="width: 24px; height: 24px;"></i>
                        <p>Chargement...</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- SECTION: Feedbacks -->
        <div id="admin-section-feedbacks" class="admin-section" style="display: none;">
            <!-- Filtres -->
            <div class="card" style="margin-bottom: var(--space-xl);">
                <div style="display: flex; gap: var(--space-md); flex-wrap: wrap; align-items: center;">
                    <input type="text" id="admin-filter-search" placeholder="🔍 Rechercher par email..." style="flex: 1; min-width: 200px; padding: var(--space-sm) var(--space-md); background: var(--bg-tertiary); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-md); color: var(--text-primary);">
                    <select id="admin-filter-type" style="padding: var(--space-sm) var(--space-md); background: var(--bg-tertiary); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-md); color: var(--text-primary);">
                        <option value="all">Tous les types</option>
                        <option value="bug">🐛 Bugs</option>
                        <option value="suggestion">💡 Suggestions</option>
                        <option value="question">❓ Questions</option>
                    </select>
                    <select id="admin-filter-status" style="padding: var(--space-sm) var(--space-md); background: var(--bg-tertiary); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-md); color: var(--text-primary);">
                        <option value="all">Tous les statuts</option>
                        <option value="new">🟢 Nouveaux</option>
                        <option value="read">🔵 Lus</option>
                        <option value="resolved">✅ Résolus</option>
                    </select>
                    <input type="date" id="admin-filter-date" style="padding: var(--space-sm) var(--space-md); background: var(--bg-tertiary); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-md); color: var(--text-primary);">
                    <button onclick="loadAdminFeedbacks()" class="btn" style="background: var(--accent-ui); color: white;">
                        <i data-lucide="refresh-cw" style="width: 16px; height: 16px;"></i> Rafraîchir
                    </button>
                    <button onclick="exportFeedbacksCSV()" class="btn" style="background: var(--accent-main); color: white;">
                        <i data-lucide="download" style="width: 16px; height: 16px;"></i> Export CSV
                    </button>
                </div>
            </div>

            <!-- Stats rapides feedbacks -->
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-md); margin-bottom: var(--space-xl);" id="feedback-stats">
                <div class="card" style="text-align: center; padding: var(--space-lg);">
                    <div style="font-size: 2rem; font-weight: 700; color: var(--accent-ui);" id="stat-total">0</div>
                    <div style="font-size: 0.85rem; color: var(--text-secondary);">Total</div>
                </div>
                <div class="card" style="text-align: center; padding: var(--space-lg);">
                    <div style="font-size: 2rem; font-weight: 700; color: var(--accent-danger);" id="stat-bugs">0</div>
                    <div style="font-size: 0.85rem; color: var(--text-secondary);">Bugs</div>
                </div>
                <div class="card" style="text-align: center; padding: var(--space-lg);">
                    <div style="font-size: 2rem; font-weight: 700; color: var(--accent-carbs);" id="stat-suggestions">0</div>
                    <div style="font-size: 0.85rem; color: var(--text-secondary);">Suggestions</div>
                </div>
                <div class="card" style="text-align: center; padding: var(--space-lg);">
                    <div style="font-size: 2rem; font-weight: 700; color: var(--accent-main);" id="stat-new">0</div>
                    <div style="font-size: 0.85rem; color: var(--text-secondary);">Nouveaux</div>
                </div>
            </div>

            <!-- Liste des feedbacks -->
            <div class="card">
                <h2 style="font-size: 1.3rem; font-weight: 700; margin-bottom: var(--space-lg); color: var(--text-primary); display: flex; align-items: center; gap: var(--space-sm);">
                    <i data-lucide="inbox" style="width: 22px; height: 22px;"></i>
                    <span>Feedbacks</span>
                    <span id="feedbacks-count" style="background: var(--accent-ui); color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.8rem;">0</span>
                </h2>
                <div id="admin-feedbacks-list" style="display: flex; flex-direction: column; gap: var(--space-md);">
                    <div style="text-align: center; color: var(--text-secondary); padding: var(--space-3xl);">
                        <i data-lucide="loader" style="width: 32px; height: 32px;"></i>
                        <p>Chargement...</p>
                    </div>
                </div>
                <!-- Pagination -->
                <div id="admin-pagination" style="display: flex; justify-content: center; gap: var(--space-md); margin-top: var(--space-xl);"></div>
            </div>
        </div>

        <!-- SECTION: Utilisateurs -->
        <div id="admin-section-users" class="admin-section" style="display: none;">
            <!-- Filtres utilisateurs -->
            <div class="card" style="margin-bottom: var(--space-xl);">
                <div style="display: flex; gap: var(--space-md); flex-wrap: wrap; align-items: center;">
                    <input type="text" id="users-filter-search" placeholder="🔍 Rechercher par email ou nom..." style="flex: 1; min-width: 250px; padding: var(--space-sm) var(--space-md); background: var(--bg-tertiary); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-md); color: var(--text-primary);">
                    <select id="users-filter-sort" style="padding: var(--space-sm) var(--space-md); background: var(--bg-tertiary); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-md); color: var(--text-primary);">
                        <option value="newest">Plus récents</option>
                        <option value="oldest">Plus anciens</option>
                        <option value="lastLogin">Dernière connexion</option>
                    </select>
                    <button onclick="loadAdminUsers()" class="btn" style="background: var(--accent-ui); color: white;">
                        <i data-lucide="refresh-cw" style="width: 16px; height: 16px;"></i> Rafraîchir
                    </button>
                    <button onclick="migrateUsersData()" class="btn" style="background: var(--accent-protein); color: white;">
                        <i data-lucide="database" style="width: 16px; height: 16px;"></i> Migrer données
                    </button>
                </div>
            </div>

            <!-- Message informatif -->
            <div style="background: rgba(14, 165, 233, 0.1); border-left: 3px solid var(--accent-ui); padding: var(--space-md); border-radius: var(--radius-sm); margin-bottom: var(--space-xl); font-size: 0.9rem; color: var(--text-secondary);">
                <strong style="color: var(--accent-ui);">ℹ️ Information :</strong> Cette liste affiche uniquement les utilisateurs ayant synchronisé des données dans Firestore. Les comptes créés mais n'ayant jamais synchronisé de repas/tracking n'apparaissent pas ici. Pour voir TOUS les comptes créés, consulte Firebase Console > Authentication > Users.
            </div>

            <!-- Stats utilisateurs -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: var(--space-md); margin-bottom: var(--space-xl);">
                <div class="card" style="text-align: center; padding: var(--space-lg);">
                    <div style="font-size: 2rem; font-weight: 700; color: var(--accent-ui);" id="users-stat-total">0</div>
                    <div style="font-size: 0.85rem; color: var(--text-secondary);">Total</div>
                </div>
                <div class="card" style="text-align: center; padding: var(--space-lg);">
                    <div style="font-size: 2rem; font-weight: 700; color: var(--accent-main);" id="users-stat-active-7d">0</div>
                    <div style="font-size: 0.85rem; color: var(--text-secondary);">Actifs 7j</div>
                </div>
                <div class="card" style="text-align: center; padding: var(--space-lg);">
                    <div style="font-size: 2rem; font-weight: 700; color: var(--accent-carbs);" id="users-stat-active-30d">0</div>
                    <div style="font-size: 0.85rem; color: var(--text-secondary);">Actifs 30j</div>
                </div>
            </div>

            <!-- Liste des utilisateurs -->
            <div class="card">
                <h2 style="font-size: 1.3rem; font-weight: 700; margin-bottom: var(--space-lg); color: var(--text-primary); display: flex; align-items: center; gap: var(--space-sm);">
                    <i data-lucide="users" style="width: 22px; height: 22px;"></i>
                    <span>Utilisateurs</span>
                    <span id="users-count" style="background: var(--accent-ui); color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.8rem;">0</span>
                </h2>
                <div id="admin-users-list" style="display: flex; flex-direction: column; gap: var(--space-md);">
                    <div style="text-align: center; color: var(--text-secondary); padding: var(--space-3xl);">
                        <i data-lucide="loader" style="width: 32px; height: 32px;"></i>
                        <p>Chargement...</p>
                    </div>
                </div>
                <div id="users-pagination" style="display: flex; justify-content: center; gap: var(--space-md); margin-top: var(--space-xl);"></div>
            </div>
        </div>

        <!-- SECTION: Aliments -->
        <div id="admin-section-foods" class="admin-section" style="display: none;">
            <!-- Actions aliments -->
            <div class="card" style="margin-bottom: var(--space-xl);">
                <div style="display: flex; gap: var(--space-md); flex-wrap: wrap; align-items: center;">
                    <input type="text" id="foods-filter-search" placeholder="🔍 Rechercher un aliment..." style="flex: 1; min-width: 250px; padding: var(--space-sm) var(--space-md); background: var(--bg-tertiary); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-md); color: var(--text-primary);">
                    <select id="foods-filter-category" style="padding: var(--space-sm) var(--space-md); background: var(--bg-tertiary); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-md); color: var(--text-primary);">
                        <option value="all">Toutes catégories</option>
                        <option value="proteines">Protéines</option>
                        <option value="feculents">Féculents</option>
                        <option value="legumes">Légumes</option>
                        <option value="fruits">Fruits</option>
                        <option value="produits-laitiers">Produits laitiers</option>
                        <option value="matieres-grasses">Matières grasses</option>
                        <option value="liquides">Liquides</option>
                        <option value="autres">Autres</option>
                    </select>
                    <button onclick="loadAdminFoods()" class="btn" style="background: var(--accent-ui); color: white;">
                        <i data-lucide="refresh-cw" style="width: 16px; height: 16px;"></i> Rafraîchir
                    </button>
                    <button onclick="showAddFoodModal()" class="btn" style="background: var(--accent-main); color: white;">
                        <i data-lucide="plus" style="width: 16px; height: 16px;"></i> Ajouter
                    </button>
                    <button onclick="importFoodsCSV()" class="btn" style="background: var(--accent-carbs); color: white;">
                        <i data-lucide="upload" style="width: 16px; height: 16px;"></i> Import CSV
                    </button>
                    <button onclick="exportFoodsCSV()" class="btn" style="background: var(--accent-protein); color: white;">
                        <i data-lucide="download" style="width: 16px; height: 16px;"></i> Export CSV
                    </button>
                </div>
            </div>

            <!-- Stats aliments -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: var(--space-md); margin-bottom: var(--space-xl);">
                <div class="card" style="text-align: center; padding: var(--space-lg);">
                    <div style="font-size: 2rem; font-weight: 700; color: var(--accent-ui);" id="foods-stat-total">0</div>
                    <div style="font-size: 0.85rem; color: var(--text-secondary);">Total</div>
                </div>
                <div class="card" style="text-align: center; padding: var(--space-lg);">
                    <div style="font-size: 2rem; font-weight: 700; color: var(--accent-protein);" id="foods-stat-proteins">0</div>
                    <div style="font-size: 0.85rem; color: var(--text-secondary);">Protéines</div>
                </div>
                <div class="card" style="text-align: center; padding: var(--space-lg);">
                    <div style="font-size: 2rem; font-weight: 700; color: var(--accent-carbs);" id="foods-stat-carbs">0</div>
                    <div style="font-size: 0.85rem; color: var(--text-secondary);">Féculents</div>
                </div>
                <div class="card" style="text-align: center; padding: var(--space-lg);">
                    <div style="font-size: 2rem; font-weight: 700; color: var(--accent-main);" id="foods-stat-vegetables">0</div>
                    <div style="font-size: 0.85rem; color: var(--text-secondary);">Légumes</div>
                </div>
            </div>

            <!-- Liste des aliments -->
            <div class="card">
                <h2 style="font-size: 1.3rem; font-weight: 700; margin-bottom: var(--space-lg); color: var(--text-primary); display: flex; align-items: center; gap: var(--space-sm);">
                    <i data-lucide="apple" style="width: 22px; height: 22px;"></i>
                    <span>Aliments Communs</span>
                    <span id="foods-count" style="background: var(--accent-ui); color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.8rem;">0</span>
                </h2>
                <div id="admin-foods-list" style="display: flex; flex-direction: column; gap: var(--space-md);">
                    <div style="text-align: center; color: var(--text-secondary); padding: var(--space-3xl);">
                        <i data-lucide="loader" style="width: 32px; height: 32px;"></i>
                        <p>Chargement...</p>
                    </div>
                </div>
                <div id="foods-pagination" style="display: flex; justify-content: center; gap: var(--space-md); margin-top: var(--space-xl);"></div>
            </div>
        </div>

        <!-- SECTION: Paramètres Admin -->
        <div id="admin-section-settings" class="admin-section" style="display: none;">
            <!-- Gestion des admins -->
            <div class="card" style="margin-bottom: var(--space-xl);">
                <h2 style="font-size: 1.3rem; font-weight: 700; margin-bottom: var(--space-lg); color: var(--text-primary); display: flex; align-items: center; gap: var(--space-sm);">
                    <i data-lucide="shield" style="width: 22px; height: 22px;"></i>
                    <span>Gestion des Administrateurs</span>
                </h2>
                <div id="admin-uids-list" style="margin-bottom: var(--space-lg);">
                    <p style="color: var(--text-secondary); margin-bottom: var(--space-md);">UIDs actuels: <code style="background: var(--bg-tertiary); padding: 2px 6px; border-radius: 4px; font-size: 0.9rem;" id="current-admin-uid">-</code></p>
                </div>
                <div style="display: flex; gap: var(--space-md); align-items: center; flex-wrap: wrap;">
                    <input type="text" id="new-admin-uid" placeholder="Nouvel UID admin..." style="flex: 1; min-width: 300px; padding: var(--space-sm) var(--space-md); background: var(--bg-tertiary); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-md); color: var(--text-primary);">
                    <button onclick="addAdminUID()" class="btn" style="background: var(--accent-main); color: white;">
                        <i data-lucide="user-plus" style="width: 16px; height: 16px;"></i> Ajouter Admin
                    </button>
                </div>
            </div>

            <!-- Maintenance -->
            <div class="card" style="margin-bottom: var(--space-xl);">
                <h2 style="font-size: 1.3rem; font-weight: 700; margin-bottom: var(--space-lg); color: var(--text-primary); display: flex; align-items: center; gap: var(--space-sm);">
                    <i data-lucide="tool" style="width: 22px; height: 22px;"></i>
                    <span>Maintenance</span>
                </h2>
                <div style="display: flex; flex-direction: column; gap: var(--space-md);">
                    <button onclick="migrateFoodDatabaseToFirestore()" class="btn" style="background: var(--accent-main); color: white; justify-content: flex-start;">
                        <i data-lucide="database" style="width: 16px; height: 16px;"></i> Migrer foodDatabase → Firestore (one-shot)
                    </button>
                    <button onclick="clearFirestoreCache()" class="btn" style="background: var(--accent-danger); color: white; justify-content: flex-start;">
                        <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i> Vider le cache Firestore
                    </button>
                    <button onclick="viewAdminLogs()" class="btn" style="background: var(--accent-ui); color: white; justify-content: flex-start;">
                        <i data-lucide="file-text" style="width: 16px; height: 16px;"></i> Voir les logs d'actions admin
                    </button>
                </div>
            </div>

            <!-- Logs récents -->
            <div class="card">
                <h2 style="font-size: 1.3rem; font-weight: 700; margin-bottom: var(--space-lg); color: var(--text-primary); display: flex; align-items: center; gap: var(--space-sm);">
                    <i data-lucide="activity" style="width: 22px; height: 22px;"></i>
                    <span>Dernières Actions Admin</span>
                </h2>
                <div id="admin-logs-list" style="display: flex; flex-direction: column; gap: var(--space-sm);">
                    <div style="text-align: center; color: var(--text-secondary); padding: var(--space-2xl);">
                        <p>Chargement des logs...</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- AVERTISSEMENT SANTÉ -->
    <div id="health-warning" class="tab-content">
        <div style="background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%); border-radius: var(--radius-xl); padding: var(--space-3xl); margin-bottom: var(--space-3xl); border: 1px solid rgba(255, 255, 255, 0.05); box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);">
            <div style="display: flex; align-items: center; gap: var(--space-lg); margin-bottom: var(--space-lg);">
                <div style="font-size: 3rem; display: flex; align-items: center; justify-content: center; width: 60px; height: 60px; background: var(--accent-danger); border-radius: var(--radius-lg);"><i data-lucide="alert-triangle" style="width: 36px; height: 36px; color: white;"></i></div>
                <div>
                    <h1 style="font-size: 2rem; font-weight: 700; margin: 0; color: var(--accent-danger);">
                        Avertissement Santé
                    </h1>
                    <p style="margin: 0; margin-top: var(--space-xs); color: var(--text-secondary); font-size: 1rem;">
                        Ce que tu dois savoir avant de commencer
                    </p>
                </div></div></div>

        <div class="card">
            <div style="background: rgba(239, 68, 68, 0.1); border-left: 4px solid var(--accent-danger); border-radius: var(--radius-md); padding: var(--space-xl); margin-bottom: var(--space-2xl);">
                <h2 style="font-size: 1.4rem; font-weight: 700; margin-bottom: var(--space-md); color: var(--accent-danger);"><i data-lucide="alert-circle" class="icon-inline"></i> Avertissement Important</h2>
                <p style="margin: 0; line-height: 1.8; color: var(--text-primary); font-weight: 500;">
                    NutriTrack est un outil d'information et de suivi nutritionnel. Il ne remplace en aucun cas l'avis d'un professionnel de santé (médecin, nutritionniste, diététicien).
                </p>
            </div>

            <h2 style="font-size: 1.6rem; font-weight: 700; margin-bottom: var(--space-xl); color: var(--text-primary);">Consulte un Professionnel</h2>
            <p style="line-height: 1.8; margin-bottom: var(--space-xl); color: var(--text-secondary);">
                Avant de commencer tout régime alimentaire ou programme nutritionnel, consulte un professionnel de santé, particulièrement si tu as :
            </p>
            <ul style="line-height: 1.8; margin-bottom: var(--space-xl); color: var(--text-secondary); padding-left: var(--space-xl);">
                <li>Des problèmes de santé existants</li>
                <li>Des troubles alimentaires (actuels ou passés)</li>
                <li>Des traitements médicaux en cours</li>
                <li>Des allergies alimentaires</li>
                <li>Moins de 18 ans</li>
                <li>Es enceinte ou allaites</li>
            </ul>

            <h2 style="font-size: 1.6rem; font-weight: 700; margin-bottom: var(--space-xl); color: var(--text-primary);">Calculs Indicatifs</h2>
            <p style="line-height: 1.8; margin-bottom: var(--space-xl); color: var(--text-secondary);">
                Les calculs de besoins caloriques et de macronutriments sont basés sur des formules reconnues mais restent des estimations. Chaque individu est unique et peut avoir des besoins différents.
            </p>

            <h2 style="font-size: 1.6rem; font-weight: 700; margin-bottom: var(--space-xl); color: var(--text-primary);">Utilisation Responsable</h2>
            <p style="line-height: 1.8; margin-bottom: var(--space-xl); color: var(--text-secondary);">
                Utilise NutriTrack de manière responsable :
            </p>
            <ul style="line-height: 1.8; margin-bottom: var(--space-xl); color: var(--text-secondary); padding-left: var(--space-xl);">
                <li>Ne descends pas en dessous de 1500 kcal/jour (hommes) ou 1200 kcal/jour (femmes) sans avis médical</li>
                <li>Ne vise pas une perte de poids supérieure à 1kg par semaine</li>
                <li>Écoute ton corps et ajuste si nécessaire</li>
                <li>Privilégie une alimentation variée et équilibrée</li>
                <li>Hydrate-toi suffisamment</li>
            </ul>

            <h2 style="font-size: 1.6rem; font-weight: 700; margin-bottom: var(--space-xl); color: var(--text-primary);">Signes d'Alerte</h2>
            <p style="line-height: 1.8; margin-bottom: var(--space-md); color: var(--text-secondary);">
                Si tu ressens l'un de ces symptômes, arrête et consulte immédiatement un professionnel :
            </p>
            <ul style="line-height: 1.8; color: var(--text-secondary); padding-left: var(--space-xl);">
                <li>Fatigue extrême persistante</li>
                <li>Étourdissements ou malaises</li>
                <li>Troubles du sommeil</li>
                <li>Perte de cheveux importante</li>
                <li>Arrêt du cycle menstruel</li>
                <li>Obsession pour la nourriture ou les chiffres</li>
                <li>Perte de poids trop rapide</li>
            </ul>
        </div>

        <!-- Section explicative des métriques de suivi corporel -->
        <div class="card" id="metrics-explainer" style="margin-top: var(--space-2xl);">
            <h2 style="font-size: 1.6rem; font-weight: 700; margin-bottom: var(--space-xl); color: var(--text-primary); display: flex; align-items: center; gap: var(--space-sm);"><i data-lucide="activity" style="width: 24px; height: 24px; color: var(--accent-main);"></i> Comprendre les Métriques de Suivi Corporel</h2>

            <p style="line-height: 1.8; margin-bottom: var(--space-xl); color: var(--text-secondary);">
                Les balances avec analyse corporelle utilisent la bio-impédancemétrie (BIA) pour estimer différentes composantes de ton corps. Voici ce que chaque métrique signifie :
            </p>

            <div style="display: grid; gap: var(--space-lg);">
                <div style="background: var(--bg-tertiary); border-radius: var(--radius-md); padding: var(--space-lg);">
                    <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--accent-protein); margin-bottom: var(--space-sm);">Poids (kg)</h3>
                    <p style="margin: 0; color: var(--text-secondary); line-height: 1.6;">Le poids total de ton corps. Varie naturellement de 1-2kg au cours de la journée en fonction de l'hydratation, des repas et d'autres facteurs. Pesez-vous idéalement le matin, à jeun, pour plus de cohérence.</p>
                </div>

                <div style="background: var(--bg-tertiary); border-radius: var(--radius-md); padding: var(--space-lg);">
                    <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--accent-carbs); margin-bottom: var(--space-sm);">Taux de Graisse (%)</h3>
                    <p style="margin: 0; color: var(--text-secondary); line-height: 1.6;">Pourcentage de masse grasse par rapport au poids total. Valeurs moyennes : Hommes 15-25%, Femmes 20-30%. Un taux trop bas peut être aussi problématique qu'un taux trop élevé.</p>
                </div>

                <div style="background: var(--bg-tertiary); border-radius: var(--radius-md); padding: var(--space-lg);">
                    <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--accent-main); margin-bottom: var(--space-sm);">Masse Musculaire (kg)</h3>
                    <p style="margin: 0; color: var(--text-secondary); line-height: 1.6;">Poids total des muscles squelettiques. Plus de muscles = métabolisme de base plus élevé. La préservation musculaire est essentielle lors d'une perte de poids.</p>
                </div>

                <div style="background: var(--bg-tertiary); border-radius: var(--radius-md); padding: var(--space-lg);">
                    <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--text-secondary); margin-bottom: var(--space-sm);">Masse Osseuse (kg)</h3>
                    <p style="margin: 0; color: var(--text-secondary); line-height: 1.6;">Poids estimé du squelette. Valeur généralement stable chez l'adulte (2-4kg selon la morphologie). L'exercice en charge et une alimentation riche en calcium et vitamine D favorisent la santé osseuse.</p>
                </div>

                <div style="background: var(--bg-tertiary); border-radius: var(--radius-md); padding: var(--space-lg);">
                    <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--accent-protein); margin-bottom: var(--space-sm);">Protéines (%)</h3>
                    <p style="margin: 0; color: var(--text-secondary); line-height: 1.6;">Pourcentage de protéines dans le corps. Valeur normale entre 16-20%. Les protéines sont essentielles pour la réparation musculaire et le système immunitaire.</p>
                </div>

                <div style="background: var(--bg-tertiary); border-radius: var(--radius-md); padding: var(--space-lg);">
                    <h3 style="font-size: 1.1rem; font-weight: 700; color: #38BDF8; margin-bottom: var(--space-sm);">Eau (%)</h3>
                    <p style="margin: 0; color: var(--text-secondary); line-height: 1.6;">Pourcentage d'eau corporelle totale. Valeurs normales : Hommes 50-65%, Femmes 45-60%. Une bonne hydratation est cruciale pour le métabolisme et la performance physique.</p>
                </div>

                <div style="background: var(--bg-tertiary); border-radius: var(--radius-md); padding: var(--space-lg);">
                    <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--accent-danger); margin-bottom: var(--space-sm);">Graisse Viscérale (niveau)</h3>
                    <p style="margin: 0; color: var(--text-secondary); line-height: 1.6;">Graisse entourant les organes internes. Échelle de 1 à 59 selon les fabricants. Niveau sain : 1-12. Au-delà de 13, risque accru de maladies cardiovasculaires et diabète. Cette métrique est particulièrement importante pour la santé.</p>
                </div>

                <div style="background: var(--bg-tertiary); border-radius: var(--radius-md); padding: var(--space-lg);">
                    <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--accent-purple); margin-bottom: var(--space-sm);">Âge Corporel (années)</h3>
                    <p style="margin: 0; color: var(--text-secondary); line-height: 1.6;">Estimation de l'âge "métabolique" basée sur ta composition corporelle. Un âge corporel inférieur à ton âge réel suggère une bonne condition physique. Cette valeur peut être améliorée avec l'exercice et une alimentation équilibrée.</p>
                </div>
            </div>

            <div style="background: rgba(16, 185, 129, 0.1); border-left: 4px solid var(--accent-main); border-radius: var(--radius-md); padding: var(--space-xl); margin-top: var(--space-xl);">
                <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--accent-main); margin-bottom: var(--space-sm);"><i data-lucide="lightbulb" class="icon-inline"></i> Conseil</h3>
                <p style="margin: 0; line-height: 1.8; color: var(--text-primary);">
                    Les mesures par bio-impédancemétrie sont des <strong>estimations</strong> et peuvent varier selon l'hydratation, le moment de la journée et le modèle de balance. Pour un suivi précis, mesure-toi toujours dans les mêmes conditions (même heure, même niveau d'hydratation).
                </p>
            </div>
        </div>
    </div></div>

    <!-- Footer Desktop (caché sur mobile) -->
    <footer class="footer-desktop" style="border-top: 1px solid rgba(255, 255, 255, 0.05); padding: 48px 24px; margin-top: 80px;">
        <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px; margin-bottom: 40px;">
            <div>
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px;">
                    <img src="logo.svg" alt="NutriTrack" style="height: 28px; width: auto;">
                    <span style="font-size: 1.2rem; font-weight: 700; color: var(--text-primary);">NutriTrack</span>
                </div>
                <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin: 0;">Mange mieux, simplement.</p>
            </div>
            <div>
                <h4 style="color: var(--text-primary); font-size: 0.85rem; font-weight: 700; margin: 0 0 16px; text-transform: uppercase; letter-spacing: 1px;">Navigation</h4>
                <ul style="list-style: none; padding: 0; margin: 0;">
                    <li style="margin-bottom: 12px;"><a href="#" onclick="switchToTab('calculator'); return false;" style="color: var(--text-secondary); text-decoration: none; font-size: 0.9rem;">Calculateur</a></li>
                    <li style="margin-bottom: 12px;"><a href="#" onclick="switchToTab('meals'); return false;" style="color: var(--text-secondary); text-decoration: none; font-size: 0.9rem;">Mes Repas</a></li>
                    <li style="margin-bottom: 12px;"><a href="#" onclick="switchToTab('guide'); return false;" style="color: var(--text-secondary); text-decoration: none; font-size: 0.9rem;">Guide</a></li>
                    <li style="margin-bottom: 12px;"><a href="#" onclick="switchToTab('settings'); return false;" style="color: var(--text-secondary); text-decoration: none; font-size: 0.9rem;">Paramètres</a></li>
                </ul>
            </div>
            <div>
                <h4 style="color: var(--text-primary); font-size: 0.85rem; font-weight: 700; margin: 0 0 16px; text-transform: uppercase; letter-spacing: 1px;">Légal</h4>
                <ul style="list-style: none; padding: 0; margin: 0;">
                    <li style="margin-bottom: 12px;"><a href="#" onclick="switchToTab('about'); return false;" style="color: var(--text-secondary); text-decoration: none; font-size: 0.9rem;">À Propos</a></li>
                    <li style="margin-bottom: 12px;"><a href="#" onclick="switchToTab('privacy'); return false;" style="color: var(--text-secondary); text-decoration: none; font-size: 0.9rem;">Confidentialité</a></li>
                    <li style="margin-bottom: 12px;"><a href="#" onclick="switchToTab('terms'); return false;" style="color: var(--text-secondary); text-decoration: none; font-size: 0.9rem;">CGU</a></li>
                    <li style="margin-bottom: 12px;"><a href="#" onclick="switchToTab('legal'); return false;" style="color: var(--text-secondary); text-decoration: none; font-size: 0.9rem;">Mentions légales</a></li>
                    <li style="margin-bottom: 12px;"><a href="#" onclick="switchToTab('health-warning'); return false;" style="color: var(--text-secondary); text-decoration: none; font-size: 0.9rem;">Avertissement santé</a></li>
                </ul>
            </div>
            <div>
                <h4 style="color: var(--text-primary); font-size: 0.85rem; font-weight: 700; margin: 0 0 16px; text-transform: uppercase; letter-spacing: 1px;">Contact</h4>
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin: 0 0 12px;">Une idée ? Un bug ?</p>
                <a href="#" onclick="openFeedbackModal(); return false;" style="display: block; color: var(--accent-ui); margin-bottom: 8px; font-size: 0.9rem;">Envoyer un feedback</a>
                <a href="mailto:contact.nutritrack@gmail.com" style="color: var(--accent-ui);">contact.nutritrack@gmail.com</a>
            </div>
        </div>
        <div style="max-width: 1200px; margin: 0 auto; border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 32px; text-align: center;">
            <p style="color: var(--text-secondary); font-size: 0.85rem; margin: 0;">© 2025 NutriTrack • Tous Droits Réservés • Version 3.0</p>
        </div>
    </footer>

    <!-- Footer Mobile (caché sur desktop) -->
    <footer class="footer-mobile" style="display: none; border-top: 1px solid rgba(255, 255, 255, 0.08); padding: 24px 16px; margin-bottom: 0; text-align: center;">
        <button id="footer-install-btn" onclick="installPWA()" style="width: 100%; padding: 16px; margin-bottom: 20px; background: linear-gradient(135deg, var(--accent-main) 0%, #059669 100%); border: none; border-radius: var(--radius-lg); color: white; font-size: 1rem; font-weight: 700; cursor: pointer; display: none; align-items: center; justify-content: center; gap: 10px;">
            <i data-lucide="download" style="width: 22px; height: 22px;"></i>
            Installer l'application
        </button>
        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-bottom: 12px;">
            <a href="#" onclick="switchToTab('about'); return false;" style="color: var(--text-secondary); text-decoration: none; font-size: 0.8rem;">À propos</a>
            <a href="#" onclick="switchToTab('health-warning'); return false;" style="color: var(--text-secondary); text-decoration: none; font-size: 0.8rem;">Santé</a>
            <a href="#" onclick="switchToTab('privacy'); return false;" style="color: var(--text-secondary); text-decoration: none; font-size: 0.8rem;">Confidentialité</a>
        </div>
        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-bottom: 16px;">
            <a href="#" onclick="switchToTab('terms'); return false;" style="color: var(--text-secondary); text-decoration: none; font-size: 0.8rem;">CGU</a>
            <a href="#" onclick="switchToTab('legal'); return false;" style="color: var(--text-secondary); text-decoration: none; font-size: 0.8rem;">Mentions légales</a>
        </div>
        <p style="color: var(--text-muted); font-size: 0.7rem; margin: 0;">© 2025 NutriTrack • v3.0</p>
    </footer>

    <!-- Food Search Modal -->
            </main>
        </div>
        <!-- End App Layout -->

    <div id="foodModal" class="modal">
        <div class="modal-content">
            <div class="modal-header" style="position: relative;">
                <button class="modal-close" onclick="closeFoodModal()">×</button>
                <h2 class="modal-title">Ajouter un aliment</h2>
            </div>

            <div class="modal-body">
                <div class="search-box">
                    <div class="search-with-scanner">
                        <input type="text" id="modalFoodSearch" placeholder="Ex: Poulet, Banane, Flocons d'avoine..." autocomplete="off">
                        <button type="button" class="scanner-btn" onclick="openBarcodeScanner()" title="Scanner un code-barres">
                            <i data-lucide="scan-barcode" style="width: 20px; height: 20px;"></i>
                        </button>
                    </div>
                    <div id="modalSearchResults" class="search-results" style="display: none;"></div>

                <div class="input-group">
                    <label>Quantité (g)</label>
                    <input type="number" id="modal-quantity" inputmode="numeric" pattern="[0-9]*" value="100" min="1" step="1" placeholder="Ex: 150 (grammes)">
                </div></div></div></div>
    </div>

    <!-- Add Custom Food Modal -->
    <div id="addFoodModal" class="modal">
        <div class="modal-content">
            <div class="modal-header" style="position: relative;">
                <button class="modal-close" onclick="closeAddFoodModal()">×</button>
                <h2 class="modal-title">Ajouter un aliment Personnalisé</h2>
                <p class="info-text" style="margin-bottom: var(--space-lg); font-size: 0.85rem;">Les champs marqués d'un astérisque (*) sont obligatoires</p>
                <!-- Bouton Scanner Code-barres + Saisie manuelle -->
                <div style="display: flex; gap: var(--space-sm); margin-bottom: var(--space-md);">
                    <button type="button" class="btn" onclick="openBarcodeScannerFromAddModal()" style="flex: 1; background: var(--bg-tertiary); border: 1px solid rgba(255, 255, 255, 0.2);">
                        <i data-lucide="scan-barcode" class="icon-inline"></i> Scanner
                    </button>
                    <div style="flex: 2; display: flex; gap: var(--space-xs);">
                        <input type="text" id="manual-barcode-input" placeholder="Ou saisir code-barres" style="flex: 1; padding: var(--space-sm); background: var(--bg-tertiary); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: var(--radius-sm); color: var(--text-primary);">
                        <button type="button" class="btn" onclick="searchManualBarcode()" style="background: var(--accent-main); padding: var(--space-sm) var(--space-md);">
                            <i data-lucide="search" style="width: 16px; height: 16px;"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div class="modal-body">
                <p class="info-text" style="margin-bottom: var(--space-lg); color: var(--text-secondary);">
                    <span style="color: var(--accent-danger);">*</span> Champs obligatoires
                </p>

                <div class="input-group">
                    <label>Nom de l'aliment *</label>
                    <input type="text" id="new-food-name" placeholder="Ex: Poulet grillé maison">
                </div>

                <!-- Champ alias personnel (visible seulement pour produits OFF) -->
                <div class="input-group" id="alias-input-group" style="display: none;">
                    <label>Mon nom personnalisé <span style="color: var(--text-secondary); font-weight: 400;">(optionnel)</span></label>
                    <input type="text" id="new-food-alias" placeholder="Ex: Nutella maison">
                    <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 4px;">
                        Ce nom s'affichera chez toi uniquement. Le nom officiel reste pour la communauté.
                    </p>
                </div>

                <div class="input-group">
                    <label>Catégorie *</label>
                    <select id="new-food-category" style="width: 100%; padding: var(--space-sm); background: var(--bg-tertiary); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: var(--radius-sm); color: var(--text-primary); font-size: 0.95rem;">
                        <option value="" disabled selected>-- Choisis une catégorie --</option>
                        <option value="proteines">🥩 Protéines</option>
                        <option value="feculents">🍚 Féculents</option>
                        <option value="legumes">🥬 Légumes</option>
                        <option value="fruits">🍎 Fruits</option>
                        <option value="produits-laitiers">🧀 Laitages</option>
                        <option value="matieres-grasses">🧈 Graisses</option>
                        <option value="liquides">💧 Liquides</option>
                        <option value="autres">❓ Autres</option>
                    </select>
                </div>

                <div class="input-group">
                    <label>Unité (fixée à 100g)</label>
                    <input type="text" id="new-food-unit" value="100g" readonly disabled style="background: var(--bg-tertiary); cursor: not-allowed; opacity: 0.7;">
                </div>

                <div class="modal-grid-2">
                    <div class="input-group">
                        <label>Protéines (g) *</label>
                        <input type="number" id="new-food-protein" inputmode="decimal" pattern="[0-9]*" step="0.1" min="0" placeholder="Ex: 25">
                    </div>

                    <div class="input-group">
                        <label>Glucides (g) *</label>
                        <input type="number" id="new-food-carbs" inputmode="decimal" pattern="[0-9]*" step="0.1" min="0" placeholder="Ex: 10">
                    </div>

                    <div class="input-group">
                        <label>Lipides (g) *</label>
                        <input type="number" id="new-food-fat" inputmode="decimal" pattern="[0-9]*" step="0.1" min="0" placeholder="Ex: 5">
                    </div>

                    <div class="input-group">
                        <label>Fibres (g)</label>
                        <input type="number" id="new-food-fiber" inputmode="decimal" pattern="[0-9]*" step="0.1" min="0" placeholder="Facultatif">
                    </div>

                    <div class="input-group">
                        <label>Calories (kcal)</label>
                        <input type="number" id="new-food-calories" step="1" min="0" placeholder="Auto-calculé si vide">
                    </div></div>

                <p class="info-text">Les calories seront calculées automatiquement si tu ne les remplis pas (Prot×4 + Glu×4 + Lip×9)</p>

                <button class="btn" onclick="saveNewFood()" style="width: 100%; margin-top: 20px;"><i data-lucide="plus" class="icon-inline"></i> Ajouter à ma Base</button>
            </div></div></div>

    <!-- Barcode Scanner Modal -->
    <div id="barcodeScannerModal" class="modal">
        <div class="modal-content scanner-modal-content">
            <div class="modal-header" style="position: relative;">
                <button class="modal-close" onclick="closeBarcodeScanner()">×</button>
                <h2 class="modal-title"><i data-lucide="scan-barcode" style="width: 22px; height: 22px; display: inline; vertical-align: middle;"></i> Scanner un code-barres</h2>
            </div>
            <div class="modal-body">
                <div id="scanner-container">
                    <div id="barcode-reader"></div>
                    <div id="scanner-status" class="scanner-status">
                        <i data-lucide="camera" style="width: 24px; height: 24px;"></i>
                        <span>Positionnez le code-barres devant la caméra</span>
                    </div>
                    <!-- Bouton Flash -->
                    <button id="scanner-flash-btn" onclick="toggleScannerFlash()" style="display: none; position: absolute; bottom: 16px; right: 16px; width: 48px; height: 48px; border-radius: 50%; background: rgba(0, 0, 0, 0.6); border: 2px solid rgba(255, 255, 255, 0.3); color: white; cursor: pointer; z-index: 10;">
                        <i data-lucide="zap" style="width: 24px; height: 24px;"></i>
                    </button>
                </div>
                <div id="scanner-result" style="display: none;">
                    <div class="scanner-result-content">
                        <i data-lucide="loader" class="spinner" style="width: 32px; height: 32px;"></i>
                        <p id="scanner-result-text">Recherche du produit...</p>
                    </div>
                </div>
                <button class="btn-ghost btn-full" onclick="closeBarcodeScanner()" style="margin-top: var(--space-lg);">
                    <i data-lucide="x" class="icon-inline"></i> Annuler
                </button>
            </div>
        </div>
    </div>

    <!-- html2canvas loaded dynamically when needed -->

    <script src="app.js"></script>

    <!-- Pop-up custom -->
    <div class="custom-popup-overlay" id="custom-popup">
        <div class="custom-popup">
            <h3 id="popup-title">Confirmation</h3>
            <p id="popup-message">Êtes-vous sûr ?</p>
            <div class="custom-popup-buttons">
                <button class="custom-popup-btn cancel" onclick="closePopup(false)">Annuler</button>
                <button class="custom-popup-btn confirm" id="popup-confirm-btn" onclick="closePopup(true)">Confirmer</button>
            </div></div></div>


    <!-- Pop-up avec input (pour prompt) -->
    <div class="custom-popup-overlay" id="custom-prompt">
        <div class="custom-popup">
            <h3 id="prompt-title">Saisir une valeur</h3>
            <p id="prompt-message">Entrez la valeur :</p>
            <input type="text" id="prompt-input" class="form-input" style="width: 100%; margin-bottom: 20px; padding: var(--space-md); border-radius: var(--radius-md); border: 1px solid var(--bg-tertiary); background: var(--bg-tertiary); color: var(--text-primary);">
            <div class="custom-popup-buttons">
                <button class="custom-popup-btn cancel" onclick="closePrompt(null)">Annuler</button>
                <button class="custom-popup-btn confirm" onclick="closePrompt(document.getElementById('prompt-input').value)">Valider</button>
            </div></div></div>

    <!-- Modal Éditer Aliment -->
    <div class="custom-popup-overlay" id="edit-food-modal">
        <div class="custom-popup" style="max-width: 600px;">
            <h3 style="margin-bottom: var(--space-lg);">✏️ Modifier l'aliment</h3>

            <div style="display: flex; flex-direction: column; gap: var(--space-md); margin-bottom: var(--space-lg);">
                <div>
                    <label style="display: block; margin-bottom: var(--space-xs); color: var(--text-secondary); font-size: 0.9rem;">Nom *</label>
                    <input type="text" id="edit-food-name" class="form-input" style="width: 100%; padding: var(--space-md); border-radius: var(--radius-md); border: 1px solid var(--bg-tertiary); background: var(--bg-tertiary); color: var(--text-primary);">
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md);">
                    <div>
                        <label style="display: block; margin-bottom: var(--space-xs); color: var(--text-secondary); font-size: 0.9rem;">Catégorie *</label>
                        <select id="edit-food-category" style="width: 100%; padding: var(--space-md); border-radius: var(--radius-md); border: 1px solid var(--bg-tertiary); background: var(--bg-tertiary); color: var(--text-primary);">
                            <option value="proteines">Protéines</option>
                            <option value="feculents">Féculents</option>
                            <option value="legumes">Légumes</option>
                            <option value="fruits">Fruits</option>
                            <option value="produits-laitiers">Produits laitiers</option>
                            <option value="matieres-grasses">Matières grasses</option>
                            <option value="liquides">Liquides</option>
                            <option value="autres">Autres</option>
                        </select>
                    </div>

                    <div>
                        <label style="display: block; margin-bottom: var(--space-xs); color: var(--text-secondary); font-size: 0.9rem;">Unité *</label>
                        <input type="text" id="edit-food-unit" class="form-input" placeholder="ex: 100g, 1u" style="width: 100%; padding: var(--space-md); border-radius: var(--radius-md); border: 1px solid var(--bg-tertiary); background: var(--bg-tertiary); color: var(--text-primary);">
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-md);">
                    <div>
                        <label style="display: block; margin-bottom: var(--space-xs); color: var(--accent-main); font-size: 0.9rem;">Calories *</label>
                        <input type="number" id="edit-food-calories" step="0.1" class="form-input" style="width: 100%; padding: var(--space-md); border-radius: var(--radius-md); border: 1px solid var(--bg-tertiary); background: var(--bg-tertiary); color: var(--text-primary);">
                    </div>

                    <div>
                        <label style="display: block; margin-bottom: var(--space-xs); color: var(--accent-protein); font-size: 0.9rem;">Protéines *</label>
                        <input type="number" id="edit-food-protein" step="0.1" class="form-input" style="width: 100%; padding: var(--space-md); border-radius: var(--radius-md); border: 1px solid var(--bg-tertiary); background: var(--bg-tertiary); color: var(--text-primary);">
                    </div>

                    <div>
                        <label style="display: block; margin-bottom: var(--space-xs); color: var(--accent-carbs); font-size: 0.9rem;">Glucides *</label>
                        <input type="number" id="edit-food-carbs" step="0.1" class="form-input" style="width: 100%; padding: var(--space-md); border-radius: var(--radius-md); border: 1px solid var(--bg-tertiary); background: var(--bg-tertiary); color: var(--text-primary);">
                    </div>

                    <div>
                        <label style="display: block; margin-bottom: var(--space-xs); color: var(--accent-fat); font-size: 0.9rem;">Lipides *</label>
                        <input type="number" id="edit-food-fat" step="0.1" class="form-input" style="width: 100%; padding: var(--space-md); border-radius: var(--radius-md); border: 1px solid var(--bg-tertiary); background: var(--bg-tertiary); color: var(--text-primary);">
                    </div>
                </div>

                <div id="edit-food-validation-warning" style="display: none; background: rgba(239, 68, 68, 0.1); border-left: 3px solid var(--accent-danger); padding: var(--space-md); border-radius: var(--radius-sm); color: var(--accent-danger); font-size: 0.85rem;">
                    ⚠️ Attention: Les macros ne correspondent pas aux calories (P×4 + G×4 + L×9)
                </div>
            </div>

            <div class="custom-popup-buttons">
                <button class="custom-popup-btn cancel" onclick="closeEditFoodModal()">Annuler</button>
                <button class="custom-popup-btn confirm" onclick="saveEditedFood()">Enregistrer</button>
            </div>
        </div>
    </div>

    <!-- Toast de confirmation -->
    <div class="toast" id="toast">
        <span id="toast-message"></span>
    </div>

    <!-- Export Warning Modal -->
    <div id="export-warning-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.9); z-index: 10001; justify-content: center; align-items: center; padding: var(--space-xl);">
        <div style="background: var(--bg-secondary); border: 2px solid var(--accent-fat); border-radius: var(--radius-lg); max-width: 500px; width: 100%; padding: var(--space-3xl); box-shadow: var(--shadow-lg); text-align: center;">
            <div style="width: 64px; height: 64px; margin: 0 auto var(--space-lg); background: var(--accent-fat); border-radius: 50%; display: flex; align-items: center; justify-content: center;"><i data-lucide="camera" style="width: 32px; height: 32px; color: white;"></i></div>

            <h2 style="font-size: 1.3rem; font-weight: 700; margin-bottom: var(--space-md); color: var(--text-primary);">
                Attention
            </h2>

            <p style="color: var(--text-secondary); font-size: 1rem; line-height: 1.7; margin-bottom: var(--space-2xl);">
                Cette image contient tes <strong style="color: var(--text-primary);">données personnelles</strong> (poids, objectifs, macros).<br><br>
                <strong style="color: var(--accent-fat);"><i data-lucide="alert-triangle" class="icon-inline"></i> Ne la partage pas publiquement</strong>
            </p>

            <div style="display: flex; gap: var(--space-lg); flex-wrap: wrap;">
                <button class="btn" onclick="cancelExport()" style="flex: 1; min-width: 150px; background: rgba(255, 255, 255, 0.1);">
                    Annuler
                </button>
                <button class="btn" onclick="confirmExport()" style="flex: 1; min-width: 150px; background: var(--accent-main);">
                    Continuer
                </button>
            </div></div></div>

    <!-- Privacy Policy Modal -->
    <div id="privacy-modal" style="display: none; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.9); z-index: 10001; justify-content: center; align-items: center; padding: var(--space-xl); overflow-y: auto;">
        <div style="background: var(--bg-secondary); border: 2px solid var(--accent-main); border-radius: var(--radius-lg); max-width: 800px; width: 100%; padding: var(--space-3xl); box-shadow: var(--shadow-lg); position: relative; max-height: 90vh; overflow-y: auto;">
            <button onclick="closePrivacyPolicy()" style="position: absolute; top: 20px; right: 20px; background: rgba(16, 185, 129, 0.1); border: 2px solid var(--accent-main); color: var(--accent-main); width: 40px; height: 40px; border-radius: 50%; cursor: pointer; font-size: 1.5rem; display: flex; align-items: center; justify-content: center;">×</button>

            <h2 style="font-size: 1.3rem; font-weight: 700; margin-bottom: var(--space-md); color: var(--text-primary);">
                <i data-lucide="lock" class="icon-inline"></i> Politique de Confidentialité
            </h2>

            <div style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.8;">
                <h3 style="color: var(--text-primary); font-size: 1.2rem; margin-top: var(--space-xl); margin-bottom: var(--space-md);">1. Collecte des données</h3>
                <p>Cette application collecte et stocke les données suivantes <strong style="color: var(--text-primary);">uniquement sur ton appareil</strong> (navigateur web, localStorage) :</p>
                <ul style="margin-left: var(--space-2xl); margin-top: var(--space-md); margin-bottom: var(--space-lg);">
                    <li>Informations personnelles : âge, sexe, taille, poids, niveau d'activité</li>
                    <li>Données nutritionnelles : repas planifiés, aliments personnalisés, objectifs macros</li>
                    <li>Suivi corporel : poids, taux de graisse, masse musculaire, mesures corporelles</li>
                    <li>Préférences : consentement RGPD, paramètres de l'application</li>
                </ul>

                <h3 style="color: var(--text-primary); font-size: 1.2rem; margin-top: var(--space-xl); margin-bottom: var(--space-md);">2. Utilisation des données</h3>
                <p>Par défaut, tes données sont stockées <strong style="color: var(--text-primary);">localement dans ton navigateur</strong> (localStorage). Si tu te connectes avec Google, elles sont également synchronisées sur <strong style="color: var(--text-primary);">Firebase Firestore</strong> (Google Cloud) pour te permettre de les retrouver sur tous tes appareils.</p>

                <h3 style="color: var(--text-primary); font-size: 1.2rem; margin-top: var(--space-xl); margin-bottom: var(--space-md);">3. Partage des données</h3>
                <p><strong style="color: var(--text-primary);">Aucune donnée n'est partagée avec des tiers.</strong> Aucun tracking, aucune analyse, aucune publicité. Les données cloud sont accessibles uniquement par toi via ton compte Google.</p>

                <h3 style="color: var(--text-primary); font-size: 1.2rem; margin-top: var(--space-xl); margin-bottom: var(--space-md);">4. Sécurité</h3>
                <p>Les données sont protégées par les mécanismes de sécurité du navigateur. Elles sont accessibles uniquement depuis ce domaine et ce navigateur.</p>

                <h3 style="color: var(--text-primary); font-size: 1.2rem; margin-top: var(--space-xl); margin-bottom: var(--space-md);">5. Tes droits</h3>
                <p>Conformément au RGPD, tu disposes des droits suivants :</p>
                <ul style="margin-left: var(--space-2xl); margin-top: var(--space-md); margin-bottom: var(--space-lg);">
                    <li><strong style="color: var(--text-primary);">Droit d'accès :</strong> Tes données sont visibles dans l'application à tout moment</li>
                    <li><strong style="color: var(--text-primary);">Droit de rectification :</strong> Tu peux modifier toutes tes données depuis l'interface</li>
                    <li><strong style="color: var(--text-primary);">Droit à l'effacement :</strong> Va dans Paramètres → Réinitialiser l'application</li>
                    <li><strong style="color: var(--text-primary);">Droit à la portabilité :</strong> Exporte tes données via Paramètres → Export JSON</li>
                </ul>

                <h3 style="color: var(--text-primary); font-size: 1.2rem; margin-top: var(--space-xl); margin-bottom: var(--space-md);">6. Cookies</h3>
                <p>Cette application n'utilise aucun cookie. Le stockage se fait uniquement via localStorage.</p>

                <h3 style="color: var(--text-primary); font-size: 1.2rem; margin-top: var(--space-xl); margin-bottom: var(--space-md);">7. Contact</h3>
                <p>Pour toute question sur cette politique : <strong style="color: var(--accent-main);"><a href="mailto:contact.nutritrack@gmail.com" style="color: var(--accent-ui);">contact.nutritrack@gmail.com</a></strong></p>

                <p style="margin-top: var(--space-2xl); font-size: 0.85rem; opacity: 0.7;">Dernière mise à jour : 17 décembre 2025</p>
            </div>

            <button class="btn" onclick="closePrivacyPolicy()" style="width: 100%; margin-top: var(--space-2xl);">
                Fermer
            </button>
        </div></div>

    <!-- Modal Feedback -->
    <div id="feedback-modal" class="modal">
        <div class="modal-content" style="max-width: 500px;">
            <div class="modal-header" style="position: relative;">
                <button class="modal-close" onclick="closeFeedbackModal()">×</button>
                <h2 class="modal-title">Envoyer un feedback</h2>
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin-top: var(--space-sm);">
                    Aide-nous à améliorer NutriTrack en partageant ton retour.
                </p>
            </div>

            <div class="modal-body">

                <div class="input-group">
                    <label>Type de feedback *</label>
                    <select id="feedback-type" onchange="toggleReproductionField()">
                        <option value="">Sélectionner...</option>
                        <option value="bug">🐛 Bug (quelque chose ne fonctionne pas)</option>
                        <option value="suggestion">💡 Suggestion (amélioration, nouvelle fonctionnalité)</option>
                        <option value="question">❓ Question (besoin d'aide)</option>
                    </select>
                </div>

                <div class="input-group">
                    <label>Onglet concerné *</label>
                    <select id="feedback-tab">
                        <option value="">Sélectionner...</option>
                        <option value="home">🏠 Accueil</option>
                        <option value="calculator">🧮 Calculateur</option>
                        <option value="meals">🍽️ Mes Repas</option>
                        <option value="planner">📅 Planning</option>
                        <option value="foods">🍎 Base d'Aliments</option>
                        <option value="meal-templates">📋 Repas Types</option>
                        <option value="tracking">📊 Suivi Corporel</option>
                        <option value="settings">⚙️ Paramètres</option>
                        <option value="other">🔧 Autre / Général</option>
                    </select>
                </div>

                <div class="input-group" id="reproduction-field" style="display: none;">
                    <label>Comment reproduire ce bug ?</label>
                    <textarea id="feedback-reproduction" placeholder="Ex: 1. Aller dans Mes Repas, 2. Cliquer sur Quick Add, 3. Taper 'nutella'..." style="min-height: 80px;"></textarea>
                </div>

                <div class="input-group">
                    <label>Description détaillée *</label>
                    <textarea id="feedback-description" placeholder="Décris le problème, ta suggestion ou ta question en détail..." style="min-height: 120px;"></textarea>
                </div>

                <button class="btn" onclick="submitFeedback()" style="width: 100%; background: var(--accent-ui); color: white; margin-top: var(--space-md);">
                    <i data-lucide="send" style="width: 18px; height: 18px;"></i>
                    Envoyer le feedback
                </button>
            </div>
        </div>
    </div>

    <!-- Modal Onboarding: Objectif -->
    <div id="onboarding-goal-modal" class="modal onboarding-modal">
        <div class="modal-content">
            <div class="modal-header">
                <button class="modal-close" onclick="closeOnboardingGoal()">&times;</button>
                <div class="onboarding-step-indicator">
                    <span>Étape 1</span> Définir ton objectif
                </div>
                <h2 class="modal-title">Quel est ton objectif ?</h2>
            </div>
            <div class="modal-body">
                <p style="color: var(--text-secondary); margin-bottom: var(--space-xl);">
                    Choisis l'objectif qui correspond à ce que tu veux accomplir. Tu pourras le modifier à tout moment.
                </p>

                <div class="goal-selector-onboarding" id="onboarding-goal-selector">
                    <div class="goal-btn" data-goal="cut" onclick="selectOnboardingGoal('cut')">
                        <div class="goal-title"><i data-lucide="trending-down" style="width: 16px; height: 16px; display: inline-block; vertical-align: middle; margin-right: 4px;"></i>Sèche</div>
                        <div class="goal-desc">Perdre du gras</div>
                    </div>
                    <div class="goal-btn" data-goal="maintain" onclick="selectOnboardingGoal('maintain')">
                        <div class="goal-title"><i data-lucide="equal" style="width: 16px; height: 16px; display: inline-block; vertical-align: middle; margin-right: 4px;"></i>Maintien</div>
                        <div class="goal-desc">Garder ton poids</div>
                    </div>
                    <div class="goal-btn" data-goal="bulk" onclick="selectOnboardingGoal('bulk')">
                        <div class="goal-title"><i data-lucide="trending-up" style="width: 16px; height: 16px; display: inline-block; vertical-align: middle; margin-right: 4px;"></i>Prise</div>
                        <div class="goal-desc">Prendre du muscle</div>
                    </div>
                </div>

                <div class="onboarding-actions">
                    <button class="btn btn-skip" onclick="skipOnboardingGoal()">Passer</button>
                    <button class="btn" id="onboarding-goal-confirm" onclick="confirmOnboardingGoal()" disabled style="opacity: 0.5;">
                        <i data-lucide="check" style="width: 16px; height: 16px;"></i>
                        Valider
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Onboarding: Profil -->
    <div id="onboarding-profile-modal" class="modal onboarding-modal">
        <div class="modal-content">
            <div class="modal-header">
                <button class="modal-close" onclick="closeOnboardingProfile()">&times;</button>
                <div class="onboarding-step-indicator">
                    <span>Étape 2</span> Ton profil
                </div>
                <h2 class="modal-title">Quelques infos sur toi</h2>
            </div>
            <div class="modal-body">
                <p style="color: var(--text-secondary); margin-bottom: var(--space-xl);">
                    Ces informations permettent de calculer tes besoins caloriques. Elles restent sur ton appareil.
                </p>

                <div style="display: grid; gap: var(--space-lg);">
                    <div class="input-group">
                        <label style="display: flex; align-items: center; gap: var(--space-xs); font-weight: 600; margin-bottom: var(--space-sm);">
                            ⚖️ Poids actuel (kg) <span style="color: var(--accent-danger);">*</span>
                        </label>
                        <input type="number" id="onboarding-weight" inputmode="decimal" step="0.1" min="30" max="300" placeholder="Ex: 75" style="width: 100%; padding: 14px; font-size: 1rem; background: var(--bg-tertiary); border: 2px solid var(--bg-tertiary); border-radius: var(--radius-md); color: var(--text-primary);">
                    </div>

                    <div class="input-group">
                        <label style="display: flex; align-items: center; gap: var(--space-xs); font-weight: 600; margin-bottom: var(--space-sm);">
                            📏 Taille (cm) <span style="color: var(--accent-danger);">*</span>
                        </label>
                        <input type="number" id="onboarding-height" inputmode="decimal" step="1" min="100" max="250" placeholder="Ex: 175" style="width: 100%; padding: 14px; font-size: 1rem; background: var(--bg-tertiary); border: 2px solid var(--bg-tertiary); border-radius: var(--radius-md); color: var(--text-primary);">
                    </div>

                    <div class="input-group">
                        <label style="display: flex; align-items: center; gap: var(--space-xs); font-weight: 600; margin-bottom: var(--space-sm);">
                            🏃 Niveau d'activité <span style="color: var(--accent-danger);">*</span>
                        </label>
                        <select id="onboarding-activity" style="width: 100%; padding: 14px; font-size: 1rem; background: var(--bg-tertiary); border: 2px solid var(--bg-tertiary); border-radius: var(--radius-md); color: var(--text-primary); font-family: inherit;">
                            <option value="">-- Sélectionner --</option>
                            <option value="1.2">🪑 Sédentaire (peu ou pas d'exercice)</option>
                            <option value="1.375">🚶 Légèrement actif (1-3 jours/semaine)</option>
                            <option value="1.55">🏃 Modérément actif (3-5 jours/semaine)</option>
                            <option value="1.725">💪 Très actif (6-7 jours/semaine)</option>
                            <option value="1.9">🔥 Extrêmement actif (2x/jour)</option>
                        </select>
                    </div>
                </div>

                <div style="margin-top: var(--space-xl); padding: var(--space-md); background: rgba(16, 185, 129, 0.05); border-radius: var(--radius-md); border-left: 3px solid var(--accent-main);">
                    <div style="font-size: 0.85rem; color: var(--text-secondary); display: flex; align-items: start; gap: var(--space-sm);">
                        <i data-lucide="shield-check" style="width: 16px; height: 16px; color: var(--accent-main); flex-shrink: 0; margin-top: 2px;"></i>
                        <span>Tes données sont stockées uniquement sur ton appareil et ne sont jamais partagées.</span>
                    </div>
                </div>

                <div class="onboarding-actions">
                    <button class="btn btn-skip" onclick="skipOnboardingProfile()">Passer</button>
                    <button class="btn" id="onboarding-profile-confirm" onclick="confirmOnboardingProfile()">
                        <i data-lucide="check" style="width: 16px; height: 16px;"></i>
                        Valider
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Onboarding: Premier repas -->
    <div id="onboarding-meal-modal" class="modal onboarding-modal">
        <div class="modal-content">
            <div class="modal-header">
                <button class="modal-close" onclick="closeOnboardingMeal()">&times;</button>
                <div class="onboarding-step-indicator">
                    <span>Étape 3</span> Ton premier repas
                </div>
                <h2 class="modal-title">Ajouter un repas exemple</h2>
            </div>
            <div class="modal-body">
                <p style="color: var(--text-secondary); margin-bottom: var(--space-lg);">
                    Pour découvrir le fonctionnement, on te propose un petit-déjeuner exemple que tu pourras modifier ou supprimer.
                </p>

                <div class="example-meal-preview">
                    <div class="example-meal-preview-title">
                        <i data-lucide="coffee" style="width: 16px; height: 16px; color: var(--accent-fat);"></i>
                        Petit-déjeuner exemple
                    </div>
                    <div class="example-meal-item">
                        <span class="example-meal-item-name">Flocons d'avoine (50g)</span>
                        <span class="example-meal-item-macros">189 kcal</span>
                    </div>
                    <div class="example-meal-item">
                        <span class="example-meal-item-name">Lait demi-écrémé (200ml)</span>
                        <span class="example-meal-item-macros">92 kcal</span>
                    </div>
                    <div class="example-meal-item">
                        <span class="example-meal-item-name">Banane (1 moyenne)</span>
                        <span class="example-meal-item-macros">89 kcal</span>
                    </div>
                    <div style="margin-top: var(--space-md); padding-top: var(--space-md); border-top: 1px solid rgba(255, 255, 255, 0.1); display: flex; justify-content: space-between; font-weight: 600;">
                        <span style="color: var(--text-primary);">Total</span>
                        <span style="color: var(--accent-main);">370 kcal</span>
                    </div>
                </div>

                <div style="padding: var(--space-md); background: rgba(56, 189, 248, 0.05); border-radius: var(--radius-md); border-left: 3px solid var(--accent-carbs);">
                    <div style="font-size: 0.85rem; color: var(--text-secondary); display: flex; align-items: start; gap: var(--space-sm);">
                        <i data-lucide="info" style="width: 16px; height: 16px; color: var(--accent-carbs); flex-shrink: 0; margin-top: 2px;"></i>
                        <span>Tu pourras ensuite modifier les quantités ou supprimer ces aliments depuis l'onglet "Mes Repas".</span>
                    </div>
                </div>

                <div class="onboarding-actions">
                    <button class="btn btn-skip" onclick="skipOnboardingMeal()">Passer</button>
                    <button class="btn" onclick="confirmOnboardingMeal()">
                        <i data-lucide="plus" style="width: 16px; height: 16px;"></i>
                        Ajouter ce repas
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal RGPD -->
    <div id="rgpd-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.9); z-index: 10000; justify-content: center; align-items: flex-start; padding: 16px; padding-top: 50px; overflow-y: auto;">
        <div style="background: var(--bg-secondary); border: 2px solid var(--accent-main); border-radius: 12px; max-width: 500px; width: 100%; padding: 20px; box-shadow: var(--shadow-lg);">
            <h2 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 12px; color: var(--text-primary);">
                <i data-lucide="lock" class="icon-inline"></i> Protection de tes données
            </h2>

            <div style="color: var(--text-secondary); font-size: 0.82rem; line-height: 1.5; margin-bottom: 18px;">
                <p style="margin-bottom: 10px;">
                    Cette application stocke tes données de santé (poids, âge, activité physique, suivi nutritionnel) <strong style="color: var(--text-primary);">localement sur ton navigateur</strong> (localStorage).
                </p>
                <p style="margin-bottom: 10px;">
                    <strong style="color: var(--text-primary);">Option cloud :</strong> Tu peux te connecter avec Google pour synchroniser tes données de manière sécurisée sur Firebase.
                </p>
                <p style="margin-bottom: 10px;">
                    En utilisant cet outil, tu consens au traitement local de ces données personnelles conformément au RGPD.
                </p>
                <p>
                    Tu peux supprimer tes données à tout moment via Paramètres → Réinitialiser.
                </p>
            </div>

            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <button class="btn" onclick="acceptRGPD()" style="flex: 1; min-width: 150px; font-size: 0.85rem; padding: 10px 16px;">
                    <i data-lucide="check-circle" class="icon-inline"></i> J'accepte
                </button>
                <button class="btn" onclick="refuseRGPD()" style="flex: 1; min-width: 150px; font-size: 0.85rem; padding: 10px 16px; background: var(--accent-danger);">
                    <i data-lucide="x-circle" class="icon-inline"></i> Je refuse
                </button>
            </div>

            <p style="margin-top: 14px; font-size: 0.72rem; color: var(--text-secondary); text-align: center;">
                <a href="#" onclick="showPrivacyPolicy(); return false;" style="color: var(--accent-main); text-decoration: underline;">
                    Politique de confidentialité
                </a>
            </p>
        </div></div>

    <!-- Tutoriel première connexion -->

    <!-- LANDING -->

    <!-- ======================================= -->
    <!--         LANDING PAGE & TUTORIAL         -->
    <!-- ======================================= -->

    <!-- Landing Page -->
    <!-- HOMEPAGE PROFESSIONNELLE -->
    <div id="landing-page" style="position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background: linear-gradient(135deg, #0a2f23 0%, #0d3d2d 30%, #115c42 60%, #0a2f23 100%); z-index: 10000; overflow-y: auto; -webkit-overflow-scrolling: touch; overflow-x: hidden; display: none;">

        <!-- Floating Food Elements Background -->
        <div class="landing-floating-foods" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; overflow: hidden; z-index: 0;">
            <!-- Broccoli Left -->
            <img src="assets/landing/broccoli.png" alt="" style="position: absolute; top: 15%; left: 3%; width: 120px; height: auto; opacity: 0.9; transform: rotate(-15deg); animation: floatSlow 8s ease-in-out infinite; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3));">
            <!-- Avocado -->
            <img src="assets/landing/avocado.png" alt="" style="position: absolute; top: 35%; left: 8%; width: 100px; height: auto; opacity: 0.85; transform: rotate(10deg); animation: floatMedium 7s ease-in-out infinite 1s; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3));">
            <!-- Grapes Left -->
            <img src="assets/landing/grapes.png" alt="" style="position: absolute; top: 60%; left: 2%; width: 90px; height: auto; opacity: 0.8; transform: rotate(-5deg); animation: floatSlow 9s ease-in-out infinite 2s; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3));">
            <!-- Chicken Right -->
            <img src="assets/landing/chicken.png" alt="" style="position: absolute; top: 20%; right: 5%; width: 110px; height: auto; opacity: 0.9; transform: rotate(15deg) scaleX(-1); animation: floatMedium 6s ease-in-out infinite; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3));">
            <!-- Potato Right -->
            <img src="assets/landing/potato.png" alt="" style="position: absolute; top: 50%; right: 3%; width: 130px; height: auto; opacity: 0.85; transform: rotate(-10deg); animation: floatSlow 10s ease-in-out infinite 1.5s; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3));">
            <!-- Tomato -->
            <img src="assets/landing/tomato.png" alt="" style="position: absolute; top: 75%; right: 8%; width: 80px; height: auto; opacity: 0.8; animation: floatMedium 7s ease-in-out infinite 3s; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3));">
            <!-- Carrot -->
            <img src="assets/landing/carrot.png" alt="" style="position: absolute; top: 10%; left: 20%; width: 70px; height: auto; opacity: 0.7; transform: rotate(25deg); animation: floatSlow 11s ease-in-out infinite 2s; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3));">
            <!-- Apple -->
            <img src="assets/landing/apple.png" alt="" style="position: absolute; top: 80%; left: 15%; width: 75px; height: auto; opacity: 0.7; animation: floatMedium 8s ease-in-out infinite 4s; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3));">
            <!-- Egg -->
            <img src="assets/landing/egg.png" alt="" style="position: absolute; top: 5%; right: 18%; width: 60px; height: auto; opacity: 0.6; animation: floatSlow 9s ease-in-out infinite 1s; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3));">
            <!-- Lettuce -->
            <img src="assets/landing/lettuce.png" alt="" style="position: absolute; top: 85%; right: 20%; width: 85px; height: auto; opacity: 0.7; transform: rotate(-20deg); animation: floatMedium 7s ease-in-out infinite 2.5s; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3));">
        </div>

        <style>
            @keyframes floatSlow {
                0%, 100% { transform: translateY(0) rotate(var(--r, -15deg)); }
                50% { transform: translateY(-20px) rotate(var(--r, -15deg)); }
            }
            @keyframes floatMedium {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-25px); }
            }
            /* Cacher les images flottantes sur mobile pour performance */
            @media (max-width: 768px) {
                .landing-floating-foods img {
                    display: none;
                }
            }
        </style>

        <!-- Navigation fixe -->
        <nav style="position: sticky; top: 0; z-index: 100; background: rgba(10, 47, 35, 0.9); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
            <div style="max-width: 1200px; margin: 0 auto; padding: 20px 24px; display: flex; justify-content: center; align-items: center;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <img src="logo.svg" alt="NutriTrack" style="height: 32px; width: auto;">
                    <span style="font-size: 1.5rem; font-weight: 700; color: white;">NutriTrack</span>
                </div>
            </div>
        </nav>

        <div style="max-width: 1200px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 1;">

            <!-- HERO SECTION -->
            <section style="padding: 120px 0 80px; text-align: center;">
                <div style="margin-bottom: 24px;">
                    <div style="display: inline-flex; gap: 8px; margin-bottom: 32px;">
                        <span style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 20px; padding: 6px 14px; font-size: 0.8rem; color: var(--accent-ui); font-weight: 600;">
                            <i data-lucide="shield-check" style="width: 14px; height: 14px; display: inline; vertical-align: middle;"></i> 100% Gratuit
                        </span>
                        <span style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 20px; padding: 6px 14px; font-size: 0.8rem; color: var(--accent-ui); font-weight: 600;">
                            <i data-lucide="lock" style="width: 14px; height: 14px; display: inline; vertical-align: middle;"></i> Données privées
                        </span>
                    </div></div>

                <h1 style="font-size: 3.5rem; font-weight: 900; color: white; margin: 0 auto 24px; max-width: 900px; line-height: 1.1; letter-spacing: -1px;">
                    Mange mieux,<br><span style="color: #4ade80;">simplement.</span>
                </h1>

                <p style="font-size: 1.25rem; color: rgba(255, 255, 255, 0.8); margin: 0 auto 48px; max-width: 700px; line-height: 1.6;">
                    Calcule tes besoins, suis tes repas et visualise ta progression. Gratuit, sans pub, et respectueux de ta vie privée.
                </p>

                <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
                    <button class="google-signin-btn" style="padding: 18px 36px; border-radius: var(--radius-md); font-size: 1.1rem; font-weight: 600; border: none; cursor: pointer; background: white; color: #1a1a1a; transition: all 0.2s ease; display: flex; align-items: center; gap: 12px;">
                        <svg viewBox="0 0 24 24" style="width: 22px; height: 22px;"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                        Continuer avec Google
                    </button>
                    <button id="landing-install-btn" onclick="installPWA()" style="display: none; padding: 18px 36px; border-radius: var(--radius-md); font-size: 1.1rem; font-weight: 600; border: 2px solid #10b981; cursor: pointer; background: transparent; color: #10b981; transition: all 0.2s ease;">
                        <i data-lucide="download" style="width: 20px; height: 20px; display: inline; vertical-align: middle;"></i>
                        Installer l'app
                    </button>
                </div>

                <p style="text-align: center; font-size: 0.85rem; color: rgba(255, 255, 255, 0.6); margin-top: 32px;">
                    <i data-lucide="shield-check" style="width: 14px; height: 14px; display: inline; vertical-align: middle;"></i> Connexion sécurisée via Google • Données synchronisées sur tous tes appareils
                </p>

                <!-- 3D Mockup Screenshot -->
                <div id="mockup-container" style="margin-top: 80px; perspective: 1500px;">
                    <div id="mockup-tilt" style="transform-style: preserve-3d; transition: transform 0.2s ease-out; will-change: transform;">
                        <div style="background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%); border: 2px solid rgba(16, 185, 129, 0.4); border-radius: 24px; padding: 0; box-shadow: 0 50px 100px rgba(0, 0, 0, 0.5); max-width: 1000px; margin: 0 auto; overflow: hidden;">
                            <div style="display: grid; grid-template-columns: 80px 1fr; min-height: 550px;">
                                <div style="background: #0a0a0a; border-right: 1px solid rgba(255, 255, 255, 0.05); padding: 24px 0; display: flex; flex-direction: column; align-items: center; gap: 8px;">
                                    <div style="width: 48px; height: 48px; background: rgba(16, 185, 129, 0.15); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
                                        <i data-lucide="calculator" style="width: 24px; height: 24px; color: var(--accent-ui);"></i>
                                    </div>
                                    <div style="width: 48px; height: 48px; background: transparent; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                                        <i data-lucide="utensils" style="width: 20px; height: 20px; color: rgba(255, 255, 255, 0.4);"></i>
                                    </div>
                                    <div style="width: 48px; height: 48px; background: transparent; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                                        <i data-lucide="calendar" style="width: 20px; height: 20px; color: rgba(255, 255, 255, 0.4);"></i>
                                    </div>
                                    <div style="width: 48px; height: 48px; background: transparent; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                                        <i data-lucide="line-chart" style="width: 20px; height: 20px; color: rgba(255, 255, 255, 0.4);"></i>
                                    </div>
                                    <div style="width: 48px; height: 48px; background: transparent; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                                        <i data-lucide="apple" style="width: 20px; height: 20px; color: rgba(255, 255, 255, 0.4);"></i>
                                    </div></div>
                                <div style="padding: 40px; overflow: hidden;">
                                    <div style="margin-bottom: 32px;">
                                        <div style="width: 70%; height: 32px; background: linear-gradient(90deg, var(--accent-ui) 0%, rgba(16, 185, 129, 0.3) 100%); border-radius: 8px; margin-bottom: 16px;"></div>
                                        <div style="width: 50%; height: 16px; background: rgba(255, 255, 255, 0.15); border-radius: 4px;"></div></div>
                                    <div style="display: grid; gap: 20px; margin-bottom: 32px;">
                                        <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 16px;">
                                            <div style="width: 40%; height: 10px; background: rgba(255, 255, 255, 0.2); border-radius: 4px; margin-bottom: 10px;"></div>
                                            <div style="width: 80%; height: 14px; background: rgba(255, 255, 255, 0.1); border-radius: 6px;"></div></div>
                                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                                            <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 16px;">
                                                <div style="width: 50%; height: 10px; background: rgba(255, 255, 255, 0.2); border-radius: 4px; margin-bottom: 10px;"></div>
                                                <div style="width: 60%; height: 14px; background: rgba(255, 255, 255, 0.1); border-radius: 6px;"></div></div>
                                            <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 16px;">
                                                <div style="width: 50%; height: 10px; background: rgba(255, 255, 255, 0.2); border-radius: 4px; margin-bottom: 10px;"></div>
                                                <div style="width: 70%; height: 14px; background: rgba(255, 255, 255, 0.1); border-radius: 6px;"></div></div></div></div>
                                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
                                        <div style="background: rgba(255, 107, 157, 0.1); border: 1px solid rgba(255, 107, 157, 0.3); border-radius: 16px; padding: 20px;">
                                            <div style="width: 40px; height: 40px; background: rgba(255, 107, 157, 0.2); border-radius: 10px; margin-bottom: 12px;"></div>
                                            <div style="width: 60%; height: 12px; background: rgba(255, 255, 255, 0.3); border-radius: 4px; margin-bottom: 6px;"></div>
                                            <div style="width: 80%; height: 8px; background: rgba(255, 255, 255, 0.2); border-radius: 4px;"></div></div>
                                        <div style="background: rgba(78, 205, 196, 0.1); border: 1px solid rgba(78, 205, 196, 0.3); border-radius: 16px; padding: 20px;">
                                            <div style="width: 40px; height: 40px; background: rgba(78, 205, 196, 0.2); border-radius: 10px; margin-bottom: 12px;"></div>
                                            <div style="width: 60%; height: 12px; background: rgba(255, 255, 255, 0.3); border-radius: 4px; margin-bottom: 6px;"></div>
                                            <div style="width: 80%; height: 8px; background: rgba(255, 255, 255, 0.2); border-radius: 4px;"></div></div>
                                        <div style="background: rgba(255, 230, 109, 0.1); border: 1px solid rgba(255, 230, 109, 0.3); border-radius: 16px; padding: 20px;">
                                            <div style="width: 40px; height: 40px; background: rgba(255, 230, 109, 0.2); border-radius: 10px; margin-bottom: 12px;"></div>
                                            <div style="width: 60%; height: 12px; background: rgba(255, 255, 255, 0.3); border-radius: 4px; margin-bottom: 6px;"></div>
                                            <div style="width: 80%; height: 8px; background: rgba(255, 255, 255, 0.2); border-radius: 4px;"></div></div></div></div></div></div></div>
                </div>

                <script>
                (function() {
                    const mockupContainer = document.getElementById('mockup-container');
                    const mockupTilt = document.getElementById('mockup-tilt');

                    if (mockupContainer && mockupTilt && window.innerWidth > 768) {
                        let mouseX = 0, mouseY = 0, currentX = 0, currentY = 0;

                        mockupContainer.addEventListener('mousemove', (e) => {
                            const rect = mockupContainer.getBoundingClientRect();
                            mouseX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
                            mouseY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
                        });

                        mockupContainer.addEventListener('mouseleave', () => { mouseX = 0; mouseY = 0; });

                        function animate() {
                            currentX += (mouseX - currentX) * 0.1;
                            currentY += (mouseY - currentY) * 0.1;
                            mockupTilt.style.transform = `rotateY(${currentX * 15}deg) rotateX(${-currentY * 10}deg) translateZ(20px)`;
                            requestAnimationFrame(animate);
                        }
                        animate();
                    }
                })();
                </script>
            </section>

            <!-- FEATURES SECTION -->
            <section style="padding: 80px 0; border-top: 1px solid rgba(255, 255, 255, 0.05);">
                <div style="text-align: center; margin-bottom: 64px;">
                    <h2 style="font-size: 2.5rem; font-weight: 700; color: var(--text-primary); margin: 0 0 16px;">
                        Ce que NutriTrack fait pour toi
                    </h2>
                    <p style="font-size: 1.1rem; color: var(--text-secondary); max-width: 600px; margin: 0 auto;">
                        Des outils simples pour t'aider à mieux manger
                    </p>
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 32px;">
                    <!-- Feature 1 -->
                    <div style="background: var(--bg-secondary); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: var(--radius-lg); padding: 32px; transition: all 0.3s ease;">
                        <div style="width: 56px; height: 56px; background: rgba(16, 185, 129, 0.1); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                            <i data-lucide="calculator" style="width: 28px; height: 28px; color: var(--accent-ui);"></i>
                        </div>
                        <h3 style="font-size: 1.3rem; font-weight: 700; margin: 0 0 12px; color: var(--text-primary);">
                            Tes macros sur mesure
                        </h3>
                        <p style="color: var(--text-secondary); line-height: 1.7; margin: 0;">
                            Des formules fiables pour calculer tes besoins réels. Tu sais exactement combien manger selon ton objectif : perte, maintien ou prise de poids.
                        </p>
                    </div>

                    <!-- Feature 2 -->
                    <div style="background: var(--bg-secondary); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: var(--radius-lg); padding: 32px; transition: all 0.3s ease;">
                        <div style="width: 56px; height: 56px; background: rgba(78, 205, 196, 0.1); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                            <i data-lucide="utensils" style="width: 28px; height: 28px; color: var(--accent-carbs);"></i>
                        </div>
                        <h3 style="font-size: 1.3rem; font-weight: 700; margin: 0 0 12px; color: var(--text-primary);">
                            +100 aliments inclus
                        </h3>
                        <p style="color: var(--text-secondary); line-height: 1.7; margin: 0;">
                            Une base alimentaire prête à l'emploi. Tu peux aussi ajouter tes propres aliments et scanner des codes-barres.
                        </p>
                    </div>

                    <!-- Feature 3 -->
                    <div style="background: var(--bg-secondary); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: var(--radius-lg); padding: 32px; transition: all 0.3s ease;">
                        <div style="width: 56px; height: 56px; background: rgba(255, 230, 109, 0.1); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                            <i data-lucide="activity" style="width: 28px; height: 28px; color: var(--accent-fat);"></i>
                        </div>
                        <h3 style="font-size: 1.3rem; font-weight: 700; margin: 0 0 12px; color: var(--text-primary);">
                            Visualise tes macros
                        </h3>
                        <p style="color: var(--text-secondary); line-height: 1.7; margin: 0;">
                            Des cercles colorés pour voir en un clin d'œil où tu en es. Tu sais toujours ce qu'il te reste à manger.
                        </p>
                    </div>

                    <!-- Feature 4 -->
                    <div style="background: var(--bg-secondary); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: var(--radius-lg); padding: 32px; transition: all 0.3s ease;">
                        <div style="width: 56px; height: 56px; background: rgba(168, 85, 247, 0.1); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                            <i data-lucide="calendar" style="width: 28px; height: 28px; color: var(--accent-purple);"></i>
                        </div>
                        <h3 style="font-size: 1.3rem; font-weight: 700; margin: 0 0 12px; color: var(--text-primary);">
                            Ta semaine en un coup d'œil
                        </h3>
                        <p style="color: var(--text-secondary); line-height: 1.7; margin: 0;">
                            Retrouve tes journées passées et garde une vision globale. Pratique pour rester constant.
                        </p>
                    </div>

                    <!-- Feature 5 -->
                    <div style="background: var(--bg-secondary); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: var(--radius-lg); padding: 32px; transition: all 0.3s ease;">
                        <div style="width: 56px; height: 56px; background: rgba(255, 107, 157, 0.1); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                            <i data-lucide="trending-up" style="width: 28px; height: 28px; color: var(--accent-protein);"></i>
                        </div>
                        <h3 style="font-size: 1.3rem; font-weight: 700; margin: 0 0 12px; color: var(--text-primary);">
                            Suis ton évolution
                        </h3>
                        <p style="color: var(--text-secondary); line-height: 1.7; margin: 0;">
                            Note ton poids, ton % de graisse, et visualise ta progression avec des graphiques clairs.
                        </p>
                    </div>

                    <!-- Feature 6 -->
                    <div style="background: var(--bg-secondary); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: var(--radius-lg); padding: 32px; transition: all 0.3s ease;">
                        <div style="width: 56px; height: 56px; background: rgba(16, 185, 129, 0.1); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                            <i data-lucide="download" style="width: 28px; height: 28px; color: var(--accent-ui);"></i>
                        </div>
                        <h3 style="font-size: 1.3rem; font-weight: 700; margin: 0 0 12px; color: var(--text-primary);">
                            Tes données, ton contrôle
                        </h3>
                        <p style="color: var(--text-secondary); line-height: 1.7; margin: 0;">
                            Exporte ou importe toutes tes données en JSON. Tu peux aussi activer la sync cloud pour retrouver tes infos partout.
                        </p>
                    </div></div>
            </section>

            <!-- PRIVACY SECTION -->
            <section style="padding: 80px 0; border-top: 1px solid rgba(255, 255, 255, 0.05);">
                <div style="max-width: 800px; margin: 0 auto; text-align: center;">
                    <div style="width: 80px; height: 80px; background: rgba(16, 185, 129, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 32px;">
                        <i data-lucide="shield-check" style="width: 40px; height: 40px; color: var(--accent-ui);"></i>
                    </div>
                    <h2 style="font-size: 2.5rem; font-weight: 700; color: var(--text-primary); margin: 0 0 24px;">
                        Ta vie privée, notre priorité
                    </h2>
                    <p style="font-size: 1.2rem; color: var(--text-secondary); line-height: 1.8; margin-bottom: 40px;">
                        Par défaut, tout reste sur ton appareil. Si tu veux, tu peux activer la synchronisation cloud (Google) pour retrouver tes données partout. Aucune pub, aucun tracking.
                    </p>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px; margin-top: 48px;">
                        <div>
                            <i data-lucide="x-circle" style="width: 32px; height: 32px; color: var(--accent-danger); margin-bottom: 12px;"></i>
                            <div style="font-weight: 600; color: var(--text-primary); margin-bottom: 4px;">Pas de compte obligatoire</div>
                            <div style="font-size: 0.9rem; color: var(--text-secondary);">Tu commences directement</div></div>
                        <div>
                            <i data-lucide="x-circle" style="width: 32px; height: 32px; color: var(--accent-danger); margin-bottom: 12px;"></i>
                            <div style="font-weight: 600; color: var(--text-primary); margin-bottom: 4px;">Pas de pub</div>
                            <div style="font-size: 0.9rem; color: var(--text-secondary);">Jamais intrusive</div></div>
                        <div>
                            <i data-lucide="x-circle" style="width: 32px; height: 32px; color: var(--accent-danger); margin-bottom: 12px;"></i>
                            <div style="font-weight: 600; color: var(--text-primary); margin-bottom: 4px;">Pas de tracking</div>
                            <div style="font-size: 0.9rem; color: var(--text-secondary);">On ne te surveille pas</div></div></div></div>
            </section>

            <!-- HOW IT WORKS -->
            <section style="padding: 80px 0; border-top: 1px solid rgba(255, 255, 255, 0.05);">
                <div style="text-align: center; margin-bottom: 64px;">
                    <h2 style="font-size: 2.5rem; font-weight: 700; color: var(--text-primary); margin: 0 0 16px;">
                        Prêt en 3 étapes
                    </h2>
                    <p style="font-size: 1.1rem; color: var(--text-secondary); max-width: 600px; margin: 0 auto;">
                        Pas besoin de lire un manuel, c'est intuitif
                    </p>
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 48px; max-width: 1000px; margin: 0 auto;">
                    <!-- Step 1 -->
                    <div style="text-align: center; position: relative;">
                        <div style="width: 64px; height: 64px; background: var(--accent-ui); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; font-size: 1.8rem; font-weight: 700; color: white;">
                            1
                        </div>
                        <h3 style="font-size: 1.4rem; font-weight: 700; margin: 0 0 12px; color: var(--text-primary);">
                            Entre ton profil
                        </h3>
                        <p style="color: var(--text-secondary); line-height: 1.7;">
                            Âge, poids, taille, niveau d'activité. Quelques secondes suffisent pour démarrer.
                        </p>
                    </div>

                    <!-- Step 2 -->
                    <div style="text-align: center; position: relative;">
                        <div style="width: 64px; height: 64px; background: var(--accent-ui); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; font-size: 1.8rem; font-weight: 700; color: white;">
                            2
                        </div>
                        <h3 style="font-size: 1.4rem; font-weight: 700; margin: 0 0 12px; color: var(--text-primary);">
                            Calcule tes macros
                        </h3>
                        <p style="color: var(--text-secondary); line-height: 1.7;">
                            Choisis ton objectif (perte, maintien ou prise) et découvre tes besoins.
                        </p>
                    </div>

                    <!-- Step 3 -->
                    <div style="text-align: center; position: relative;">
                        <div style="width: 64px; height: 64px; background: var(--accent-ui); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; font-size: 1.8rem; font-weight: 700; color: white;">
                            3
                        </div>
                        <h3 style="font-size: 1.4rem; font-weight: 700; margin: 0 0 12px; color: var(--text-primary);">
                            Suis tes repas
                        </h3>
                        <p style="color: var(--text-secondary); line-height: 1.7;">
                            Ajoute tes aliments, ajuste les quantités, et visualise ton avancement en temps réel.
                        </p>
                    </div></div>
            </section>

            <!-- CTA FINAL -->
            <section style="padding: 80px 0 120px; text-align: center;">
                <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%); border: 2px solid rgba(16, 185, 129, 0.3); border-radius: var(--radius-xl); padding: 64px 32px; max-width: 800px; margin: 0 auto;">
                    <h2 style="font-size: 2.5rem; font-weight: 700; color: var(--text-primary); margin: 0 0 16px;">
                        On y va ?
                    </h2>
                    <p style="font-size: 1.2rem; color: var(--text-secondary); margin: 0 0 40px; max-width: 600px; margin-left: auto; margin-right: auto;">
                        C'est gratuit, c'est rapide, et tu peux commencer tout de suite.
                    </p>
                    <button class="google-signin-btn" style="padding: 18px 48px; border-radius: var(--radius-md); font-size: 1.1rem; font-weight: 600; border: none; cursor: pointer; background: white; color: #1a1a1a; transition: all 0.2s ease; display: inline-flex; align-items: center; gap: 12px;">
                        <svg viewBox="0 0 24 24" style="width: 22px; height: 22px;"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                        Continuer avec Google
                    </button>
                    <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 24px; opacity: 0.7;">
                        Gratuit • Synchronisation cloud • Prêt en 30 secondes
                    </p>
                </div>
            </section>

            <!-- FOOTER Desktop (Landing Page) -->
            <footer class="footer-desktop" style="border-top: 1px solid rgba(255, 255, 255, 0.05); padding: 48px 0;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px; margin-bottom: 40px;">
                    <div>
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px;">
                            <img src="logo.svg" alt="NutriTrack" style="height: 28px; width: auto;">
                            <span style="font-size: 1.2rem; font-weight: 700; color: var(--text-primary);">NutriTrack</span>
                        </div>
                        <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin: 0;">
                            Mange mieux, simplement.
                        </p>
                    </div>
                    <div>
                        <h4 style="color: var(--text-primary); font-size: 0.85rem; font-weight: 700; margin: 0 0 16px; text-transform: uppercase; letter-spacing: 1px;">Navigation</h4>
                        <ul style="list-style: none; padding: 0; margin: 0;">
                            <li style="margin-bottom: 12px;"><a href="#" onclick="skipToApp(); switchToTab('calculator'); return false;" style="color: var(--text-secondary); text-decoration: none; font-size: 0.9rem; transition: color 0.2s;">Calculateur</a></li>
                            <li style="margin-bottom: 12px;"><a href="#" onclick="skipToApp(); switchToTab('guide'); return false;" style="color: var(--text-secondary); text-decoration: none; font-size: 0.9rem; transition: color 0.2s;">Guide</a></li>
                            <li style="margin-bottom: 12px;"><a href="#" onclick="startTutorial(); return false;" style="color: var(--text-secondary); text-decoration: none; font-size: 0.9rem; transition: color 0.2s;">Tutoriel</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style="color: var(--text-primary); font-size: 0.85rem; font-weight: 700; margin: 0 0 16px; text-transform: uppercase; letter-spacing: 1px;">Légal</h4>
                        <ul style="list-style: none; padding: 0; margin: 0;">
                            <li style="margin-bottom: 12px;"><a href="#" onclick="showLegalModal('privacy'); return false;" style="color: var(--text-secondary); text-decoration: none; font-size: 0.9rem; transition: color 0.2s;">Confidentialité</a></li>
                            <li style="margin-bottom: 12px;"><a href="#" onclick="showLegalModal('terms'); return false;" style="color: var(--text-secondary); text-decoration: none; font-size: 0.9rem; transition: color 0.2s;">CGU</a></li>
                            <li style="margin-bottom: 12px;"><a href="#" onclick="showLegalModal('legal'); return false;" style="color: var(--text-secondary); text-decoration: none; font-size: 0.9rem; transition: color 0.2s;">Mentions légales</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style="color: var(--text-primary); font-size: 0.85rem; font-weight: 700; margin: 0 0 16px; text-transform: uppercase; letter-spacing: 1px;">Contact</h4>
                        <p style="color: var(--text-secondary); font-size: 0.9rem; margin: 0 0 12px;">
                            Une idée ? Un bug ?
                        </p>
                        <a href="#" onclick="openFeedbackModal(); return false;" style="display: block; color: var(--accent-ui); margin-bottom: 8px; font-size: 0.9rem;">Envoyer un feedback</a>
                        <a href="mailto:contact.nutritrack@gmail.com" style="color: var(--accent-ui);">contact.nutritrack@gmail.com</a>
                    </div>
                </div>
                <div style="border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 32px; text-align: center;">
                    <p style="color: var(--text-secondary); font-size: 0.85rem; margin: 0;">
                        © 2025 NutriTrack • Tous Droits Réservés • Version 3.0
                    </p>
                </div>
            </footer>

            <!-- FOOTER Mobile (Landing Page) -->
            <footer class="footer-mobile" style="display: none; border-top: 1px solid rgba(255, 255, 255, 0.08); padding: 24px 16px; text-align: center;">
                <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 16px; margin-bottom: 16px;">
                    <a href="#" onclick="showLegalModal('privacy'); return false;" style="color: var(--text-secondary); text-decoration: none; font-size: 0.85rem;">Confidentialité</a>
                    <a href="#" onclick="showLegalModal('terms'); return false;" style="color: var(--text-secondary); text-decoration: none; font-size: 0.85rem;">CGU</a>
                    <a href="#" onclick="showLegalModal('legal'); return false;" style="color: var(--text-secondary); text-decoration: none; font-size: 0.85rem;">Mentions légales</a>
                </div>
                <p style="color: var(--text-muted); font-size: 0.75rem; margin: 0;">© 2025 NutriTrack • v3.0</p>
            </footer>

        </div></div>

    <!-- Tutorial Fullscreen -->
    <div id="tutorial-fullscreen" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background: var(--bg-primary); z-index: 10001; overflow: hidden;">
        <div style="width: 100%; height: 100vh; display: flex; flex-direction: column; position: relative;">

            <!-- Header -->
            <div style="padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--bg-tertiary);">
                <div style="width: 50px;"></div>
                <div style="font-weight: 600; font-size: 0.82rem; color: var(--text-secondary);">
                    <span id="tutorial-counter">1</span> / <span id="tutorial-total">5</span>
                </div>
                <button onclick="closeTutorialFullscreen()" style="background: transparent; border: none; color: var(--text-secondary); font-size: 0.82rem; cursor: pointer; padding: 6px 12px; border-radius: 6px; transition: all 0.2s ease;">
                    Passer
                </button>
            </div>

            <!-- Progress Bar -->
            <div style="height: 3px; background: var(--bg-tertiary); position: relative;">
                <div id="tutorial-progress" style="height: 100%; background: var(--accent-ui); transition: width 0.4s ease; width: 0%;"></div></div>

            <!-- Content -->
            <div style="flex: 1; display: flex; align-items: center; justify-content: center; padding: 28px 16px; overflow-y: auto;">
                <div id="tutorial-slide-content" style="max-width: 460px; width: 100%; text-align: center;">
                    <!-- Slide content injected here -->
                </div></div>

            <!-- Dots -->
            <div id="tutorial-dots" style="display: flex; justify-content: center; gap: 6px; padding: 14px;">
                <!-- Dots injected here -->
            </div>

            <!-- Navigation -->
            <div style="padding: 14px 16px; display: flex; gap: 10px; border-top: 1px solid var(--bg-tertiary);">
                <button id="tutorial-prev" onclick="previousSlide()" disabled style="flex: 1; padding: 11px; border-radius: 10px; font-size: 0.88rem; font-weight: 600; border: none; cursor: pointer; background: var(--bg-tertiary); color: var(--text-primary); display: flex; align-items: center; justify-content: center; gap: 6px; transition: all 0.2s ease;">
                    <i data-lucide="chevron-left" style="width: 15px; height: 15px;"></i>
                    Précédent
                </button>
                <button id="tutorial-next" onclick="nextSlide()" style="flex: 1; padding: 11px; border-radius: 10px; font-size: 0.88rem; font-weight: 600; border: none; cursor: pointer; background: var(--accent-ui); color: white; display: flex; align-items: center; justify-content: center; gap: 6px; transition: all 0.2s ease;">
                    Suivant
                    <i data-lucide="chevron-right" style="width: 15px; height: 15px;"></i>
                </button>
            </div></div></div>

    <style>
        #landing-page button:hover { transform: translateY(-1px); }
        #tutorial-prev:disabled { opacity: 0.3; cursor: not-allowed; }
        #tutorial-next:not(:disabled):hover { transform: translateY(-2px); }
    </style>

    <script>
        // Tutorial slides data
        const tutorialSlides = [
            {
                icon: 'calculator',
                title: 'Calcule tes besoins',
                desc: 'Objectifs personnalisés selon ton profil',
                features: ['Perte, maintien ou prise de masse', 'Calcul scientifique (Mifflin-St Jeor)', 'Ajuste tes macros en temps réel']
            },
            {
                icon: 'utensils',
                title: 'Track tes repas',
                desc: 'Ajoute facilement ce que tu manges',
                features: ['116 aliments + tes propres créations', 'Repas types pour gagner du temps', 'Historique complet jour par jour']
            },
            {
                icon: 'activity',
                title: 'Suis tes macros',
                desc: 'Visualise ta progression en direct',
                features: ['Cercles de progression visuels', 'Détail Protéines • Glucides • Lipides', 'Calories restantes calculées auto']
            },
            {
                icon: 'bar-chart-3',
                title: 'Analyse tes stats',
                desc: 'Graphiques sur 7 et 30 jours',
                features: ['Évolution de ton poids', 'Moyennes de tes macros', 'Tendances et insights']
            },
            {
                icon: 'cloud',
                title: 'Sauvegarde Cloud',
                desc: 'Synchronise tes données sur tous tes appareils',
                features: ['Connexion Google dans Plus → Paramètres', 'Sync automatique en temps réel', 'Restauration facile de tes données']
            },
            {
                icon: 'check-circle',
                title: 'Prêt à démarrer !',
                desc: '100% gratuit et privé',
                features: ['Données locales par défaut', 'Fonctionne hors ligne', 'Cloud optionnel (Paramètres)']
            }
        ];

        let currentSlideIndex = 0;

        // ===== INITIALIZATION SYSTEM - 100% FIREBASE AUTH REQUIRED =====
        // Splash screen reste visible jusqu'à ce que Firebase décide quelle vue afficher
        // Pas de mode local, pas de hasSeenLanding, uniquement Firebase comme source de vérité

        // IMPORTANT: Sur window pour être accessible depuis le module Firebase
        window.appInitialized = false;

        window.showApp = function(user) {
            if (window.appInitialized) return; // Éviter les doubles initialisations
            window.appInitialized = true;

            const lastTab = localStorage.getItem('lastActiveTab') || 'home';
            const mainApp = document.getElementById('main-app');

            // Afficher l'app
            mainApp.style.display = 'block';
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';

            // Charger l'onglet ciblé
            if (typeof switchTab === 'function') {
                setTimeout(() => switchTab(lastTab), 0);
            }

            // Cacher le splash screen
            hideSplash();

            // Initialiser les icônes Lucide
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        };

        window.showLanding = function() {
            if (window.appInitialized) return; // Éviter les doubles initialisations
            window.appInitialized = true;

            const landingPage = document.getElementById('landing-page');

            // Afficher la landing page (écran de login)
            landingPage.style.display = 'block';
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';

            // Cacher le splash screen
            hideSplash();

            // Initialiser les icônes Lucide
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        };

        function hideSplash() {
            const splash = document.getElementById('app-splash');
            if (splash) {
                splash.style.opacity = '0';
                splash.style.transition = 'opacity 0.2s ease';
                setTimeout(() => {
                    splash.style.display = 'none';
                }, 200);
            }
        }

        // NOTE: L'initialisation réelle se fait dans onAuthStateChanged
        // Le splash screen reste visible jusqu'à ce que Firebase réponde

        // ===== LANDING PAGE ACTIONS - TOUTES REDIRIGENT VERS CONNEXION =====
        // Auth Firebase obligatoire pour accéder à l'app

        function enterApp() {
            // Connexion Firebase obligatoire
            if (typeof window.firebaseSignIn === 'function') {
                window.firebaseSignIn();
            } else {
                showToast('<i data-lucide="info" class="icon-inline"></i> Connexion en cours de chargement...');
            }
        }

        function startTutorial() {
            // Connexion Firebase obligatoire
            if (typeof window.firebaseSignIn === 'function') {
                window.firebaseSignIn();
            } else {
                showToast('<i data-lucide="info" class="icon-inline"></i> Connexion en cours de chargement...');
            }
        }

        function skipToApp() {
            // Connexion Firebase obligatoire
            if (typeof window.firebaseSignIn === 'function') {
                window.firebaseSignIn();
            } else {
                showToast('<i data-lucide="info" class="icon-inline"></i> Connexion en cours de chargement...');
            }
        }

        // Show legal pages in modal (accessible without login)
        function showLegalModal(pageType) {
            const titles = {
                'privacy': 'Politique de Confidentialité',
                'terms': 'Conditions Générales d\'Utilisation',
                'legal': 'Mentions Légales'
            };

            // Get content from the actual tab if it exists
            const tabContent = document.getElementById(pageType);
            let content = '';
            if (tabContent) {
                content = tabContent.innerHTML;
            } else {
                content = '<p style="color: var(--text-secondary);">Contenu non disponible.</p>';
            }

            // Create modal overlay
            const modal = document.createElement('div');
            modal.id = 'legal-modal-overlay';
            modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); z-index: 100001; display: flex; align-items: center; justify-content: center; padding: 20px;';
            modal.innerHTML = `
                <div style="background: var(--bg-secondary); border-radius: 16px; max-width: 800px; width: 100%; max-height: 90vh; overflow-y: auto; position: relative;">
                    <div style="position: sticky; top: 0; background: var(--bg-secondary); padding: 20px 24px; border-bottom: 1px solid var(--bg-tertiary); display: flex; justify-content: space-between; align-items: center; z-index: 10;">
                        <h2 style="margin: 0; font-size: 1.3rem; color: var(--text-primary);">${titles[pageType] || 'Information'}</h2>
                        <button onclick="document.getElementById('legal-modal-overlay').remove()" style="background: none; border: none; cursor: pointer; color: var(--text-secondary); font-size: 1.5rem; padding: 8px;">×</button>
                    </div>
                    <div style="padding: 24px;">${content}</div>
                </div>
            `;
            document.body.appendChild(modal);

            // Close on backdrop click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.remove();
            });
        }

        // Login with Google from landing page
        function loginWithGoogleFromLanding() {
            // Call the Firebase sign in function
            if (typeof window.firebaseSignIn === 'function') {
                window.firebaseSignIn();
            } else {
                showToast('<i data-lucide="info" class="icon-inline"></i> Connexion bientôt disponible');
            }
        }

        // Close tutorial and go to app
        function closeTutorialFullscreen() {
            // Simplement cacher le tutorial fullscreen
            // L'app est déjà affichée (l'utilisateur est forcément connecté pour voir le tutorial)
            const tutorial = document.getElementById('tutorial-fullscreen');
            if (tutorial) {
                tutorial.style.display = 'none';
            }
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }

        // Initialize tutorial
        function initTutorial() {
            // Create dots
            const dotsContainer = document.getElementById('tutorial-dots');
            dotsContainer.innerHTML = '';
            tutorialSlides.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.style.cssText = 'width: 8px; height: 8px; border-radius: 8px; background: var(--bg-tertiary); transition: all 0.3s ease; cursor: pointer;';
                if (index === 0) {
                    dot.style.width = '24px';
                    dot.style.background = 'var(--accent-ui)';
                }
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });

            // Update total
            document.getElementById('tutorial-total').textContent = tutorialSlides.length;

            // Render first slide
            renderSlide();
        }

        // Render current slide
        function renderSlide() {
            const slide = tutorialSlides[currentSlideIndex];
            const slideContent = document.getElementById('tutorial-slide-content');

            const featuresHTML = slide.features.map(f =>
                `<div style="display: flex; align-items: center; gap: 9px; padding: 8px 0;">
                    <div style="width: 5px; height: 5px; background: var(--accent-ui); border-radius: 50%; flex-shrink: 0;"></div>
                    <span style="font-size: 0.82rem; line-height: 1.4;">${f}</span>
                </div>`
            ).join('');

            slideContent.innerHTML = `
                <div style="width: 90px; height: 90px; background: var(--accent-ui); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                    <i data-lucide="${slide.icon}" style="width: 46px; height: 46px; color: white;"></i>
                </div>
                <h2 style="font-size: clamp(1.35rem, 4vw, 1.65rem); font-weight: 700; margin: 0 0 10px 0; line-height: 1.2;">${slide.title}</h2>
                <p style="font-size: 0.92rem; color: var(--text-secondary); margin: 0 0 20px 0; line-height: 1.45;">${slide.desc}</p>
                <div style="background: var(--bg-secondary); border: 1px solid rgba(5, 150, 105, 0.2); border-radius: 10px; padding: 14px 16px; text-align: left; color: var(--text-secondary);">
                    ${featuresHTML}
                </div>
            `;

            // Update counter
            document.getElementById('tutorial-counter').textContent = currentSlideIndex + 1;

            // Update progres // Update next button
            const nextBtn = document.getElementById('tutorial-next');
            if (currentSlideIndex === tutorialSlides.length - 1) {
                nextBtn.innerHTML = '<i data-lucide="check" style="width: 15px; height: 15px;"></i> Commencer';
                if (typeof lucide !== "undefined") lucide.createIcons();
                nextBtn.onclick = closeTutorialFullscreen;
            } else {
                nextBtn.innerHTML = 'Suivant <i data-lucide="chevron-right" style="width: 15px; height: 15px;"></i>';
                if (typeof lucide !== "undefined") lucide.createIcons();
                nextBtn.onclick = nextSlide;
            }
            // Reinitialize Lucide icons
            setTimeout(() =>  { if (typeof lucide !== 'undefined') {
                    lucide.createIcons(); }
            }, 50);
        }
        // Navigation functions
        function nextSlide() {
            if (currentSlideIndex < tutorialSlides.length - 1) {
                currentSlideIndex++;
                renderSlide();
                updateDots();
            }
        }
        function previousSlide() {
            if (currentSlideIndex > 0) {
                currentSlideIndex--;
                renderSlide();
                updateDots();
            }
        }
        function goToSlide(index) {
            currentSlideIndex = index;
            renderSlide();
            updateDots();
        }
        function updateDots() {
            const dots = document.querySelectorAll('#tutorial-dots > div');
            dots.forEach((dot, index) => {
                if (index === currentSlideIndex) {
                    dot.style.width = '24px';
                    dot.style.background = 'var(--accent-ui)';
                } else {
                    dot.style.width = '8px';
                    dot.style.background = 'var(--bg-tertiary)';
                }
            });
            // Mettre à jour la barre de progression
            const progress = ((currentSlideIndex + 1) / tutorialSlides.length) * 100;
            document.getElementById('tutorial-progress').style.width = progress + '%';
            // Mettre à jour le bouton précédent
            const prevBtn = document.getElementById('tutorial-prev');
            prevBtn.disabled = currentSlideIndex === 0;
        }

        // ===== RACCOURCIS CLAVIER GLOBAUX =====
        let searchSelectedIndex = -1;

        document.addEventListener('keydown', (e) => {
            const foodModal = document.getElementById('foodModal');
            const searchResults = document.getElementById('modalSearchResults');
            const modalSearch = document.getElementById('modalFoodSearch');

            // Ctrl+K - Ouvrir la recherche d'aliments (si pas déjà dans un input)
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                const activeTag = document.activeElement?.tagName?.toLowerCase();
                if (activeTag !== 'input' && activeTag !== 'textarea') {
                    e.preventDefault();
                    // Ouvrir la modale pour le premier type de repas ou le dernier utilisé
                    openFoodModal(currentMealType || 'breakfast');
                    return;
                }
            }

            // Escape - Fermer les modales actives
            if (e.key === 'Escape') {
                searchSelectedIndex = -1;

                const templatesModal = document.getElementById('templatesModal');
                if (templatesModal) {
                    closeTemplatesModal();
                    return;
                }

                if (foodModal && foodModal.classList.contains('active')) {
                    closeFoodModal();
                    return;
                }

                const addFoodModal = document.getElementById('addFoodModal');
                if (addFoodModal && addFoodModal.classList.contains('active')) {
                    closeAddFoodModal();
                    return;
                }
            }

            // Navigation dans les résultats de recherche
            if (foodModal && foodModal.classList.contains('active') &&
                searchResults && searchResults.style.display !== 'none') {

                const items = searchResults.querySelectorAll('.search-result-item');
                if (items.length === 0) return;

                // Flèche bas - Sélectionner suivant
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    searchSelectedIndex = Math.min(searchSelectedIndex + 1, items.length - 1);
                    updateSearchSelection(items);
                    return;
                }

                // Flèche haut - Sélectionner précédent
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    searchSelectedIndex = Math.max(searchSelectedIndex - 1, 0);
                    updateSearchSelection(items);
                    return;
                }

                // Enter - Valider la sélection
                if (e.key === 'Enter' && document.activeElement === modalSearch) {
                    e.preventDefault();
                    const selected = items[searchSelectedIndex] || items[0];
                    if (selected) selected.click();
                    searchSelectedIndex = -1;
                    return;
                }
            }
        });

        function updateSearchSelection(items) {
            items.forEach((item, i) => {
                item.classList.toggle('selected', i === searchSelectedIndex);
            });
            // Scroll into view si nécessaire
            if (items[searchSelectedIndex]) {
                items[searchSelectedIndex].scrollIntoView({ block: 'nearest' });
            }
        }

        // Reset selection quand on tape
        document.getElementById('modalFoodSearch')?.addEventListener('input', () => {
            searchSelectedIndex = -1;
        });

        // ===== STREAK COUNTER (based on achieving calorie goal) =====
        function calculateStreak() {
            const allDailyMeals = JSON.parse(localStorage.getItem('allDailyMeals') || '{}');
            const macroTargets = JSON.parse(localStorage.getItem('macroTargets') || '{}');
            const targetCalories = macroTargets.calories || 0;

            // If no calorie target set, no streak possible
            if (targetCalories === 0) return 0;

            // Get dates where calorie goal was achieved (within 90-110% tolerance)
            const achievedDates = new Set();
            const tolerance = 0.10; // 10% tolerance

            Object.entries(allDailyMeals).forEach(([date, meals]) => {
                let totalCalories = 0;
                ['breakfast', 'lunch', 'snack', 'dinner'].forEach(mealType => {
                    if (meals[mealType] && meals[mealType].foods) {
                        totalCalories += meals[mealType].foods.reduce((sum, f) => {
                            const quantity = f.quantity || 100;
                            const ratio = quantity / 100;
                            return sum + ((f.calories || 0) * ratio);
                        }, 0);
                    }
                });

                // Check if within tolerance (90% to 110% of target)
                const minCal = targetCalories * (1 - tolerance);
                const maxCal = targetCalories * (1 + tolerance);
                if (totalCalories >= minCal && totalCalories <= maxCal) {
                    achievedDates.add(date);
                }
            });

            if (achievedDates.size === 0) return 0;

            // Calculate streak from today/yesterday
            const today = getDateKey(new Date());
            const yesterday = getDateKey(new Date(Date.now() - 86400000));

            // Check if streak is active (today or yesterday)
            if (!achievedDates.has(today) && !achievedDates.has(yesterday)) return 0;

            let streak = 0;
            let checkDate = new Date();

            // If no achievement today, start from yesterday
            if (!achievedDates.has(today)) {
                checkDate = new Date(Date.now() - 86400000);
            }

            while (achievedDates.has(getDateKey(checkDate))) {
                streak++;
                checkDate = new Date(checkDate.getTime() - 86400000);
            }

            return streak;
        }

        function updateStreakDisplay() {
            const streak = calculateStreak();
            let streakEl = document.getElementById('streak-display');

            if (streak < 2) {
                if (streakEl) streakEl.style.display = 'none';
                return;
            }

            if (!streakEl) {
                // Insert after the title, not overlapping username
                const headerTitle = document.querySelector('.header-title');
                if (headerTitle) {
                    streakEl = document.createElement('span');
                    streakEl.id = 'streak-display';
                    streakEl.style.cssText = 'margin-left: var(--space-md);';
                    headerTitle.appendChild(streakEl);
                }
            }

            if (streakEl) {
                streakEl.innerHTML = `<span class="streak-badge">🔥 ${streak} jours</span>`;
                streakEl.style.display = 'block';
            }
        }

        // Mettre à jour le streak au chargement
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(updateStreakDisplay, 500);
        });
    </script>

    <!-- Firebase SDK -->
    <script type="module">
        // ===== FIREBASE CONFIGURATION =====
        // Vérification du protocole - Firebase nécessite http/https
        const isValidProtocol = ['http:', 'https:'].includes(window.location.protocol);

        // En mode file://, désactiver Firebase proprement
        if (!isValidProtocol) {
            console.info('ℹ️ NutriTrack fonctionne en mode LOCAL (file://). La sync cloud nécessite un serveur web.');
            console.info('   💡 Pour activer Firebase: npx serve . ou python -m http.server');
            // Fonctions placeholder pour éviter les erreurs
            window.firebaseSignIn = () => {
                alert('La synchronisation cloud nécessite un serveur web.\n\nLancez: npx serve ou python -m http.server');
            };
            window.firebaseSignOut = () => {};
            window.firebaseForceSync = () => {};
            window.firebaseRestoreFromCloud = () => {};
            window.firebaseDeleteAccount = () => {};
        }

        // Charger Firebase uniquement si protocole valide
        if (isValidProtocol) {

        const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
        const { getAuth, signInWithPopup, signOut, GoogleAuthProvider, onAuthStateChanged } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
        const { getFirestore, doc, getDoc, setDoc, deleteDoc, serverTimestamp, collection, query, getDocs, limit, updateDoc, Timestamp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
        const { getMessaging, getToken, onMessage } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js');

        const firebaseConfig = {
            apiKey: "AIzaSyCL2SvQ2c784ZyA2Pr-Qtv2F1wnnDByGkc",
            authDomain: "nutritraack.firebaseapp.com",
            projectId: "nutritraack",
            storageBucket: "nutritraack.firebasestorage.app",
            messagingSenderId: "133692710812",
            appId: "1:133692710812:web:4a5937cea6e86c9b25b259"
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const db = getFirestore(app);
        const provider = new GoogleAuthProvider();

        // ===== FIREBASE CLOUD MESSAGING (FCM) =====
        // IMPORTANT: Remplace cette clé par ta clé VAPID de Firebase Console
        // Firebase Console > Project Settings > Cloud Messaging > Web Push certificates
        const VAPID_KEY = 'BIHN84h45rQhbm5xYFPYH0sp2bZ56F9L9QBU9_lbKs_DFlvJvk7dLlj6jh1qiC21zm6To1hO3DiNm9jtN1ep12I';

        let messaging = null;
        let fcmToken = null;

        // Initialiser FCM si supporté
        async function initializeFCM() {
            try {
                if (!('Notification' in window) || !('serviceWorker' in navigator)) {
                    console.log('FCM non supporté sur ce navigateur');
                    return;
                }

                messaging = getMessaging(app);

                // Écouter les messages en foreground
                onMessage(messaging, (payload) => {
                    console.log('Message reçu en foreground:', payload);
                    // Afficher notification même si app ouverte
                    if (Notification.permission === 'granted') {
                        new Notification(payload.notification?.title || 'NutriTrack', {
                            body: payload.notification?.body || '',
                            icon: '/icon-192.png'
                        });
                    }
                });

                console.log('FCM initialisé');
            } catch (error) {
                console.error('Erreur initialisation FCM:', error);
            }
        }

        // Obtenir le token FCM et le sauvegarder
        async function getFCMToken() {
            if (!messaging) {
                console.log('FCM non initialisé');
                return null;
            }

            try {
                // Attendre que le SW soit enregistré
                if (!window.swRegistration) {
                    console.log('Service Worker pas encore enregistré, attente...');
                    await new Promise(resolve => setTimeout(resolve, 2000));
                }

                const options = { vapidKey: VAPID_KEY };

                // Utiliser notre SW si disponible
                if (window.swRegistration) {
                    options.serviceWorkerRegistration = window.swRegistration;
                }

                const currentToken = await getToken(messaging, options);

                if (currentToken) {
                    fcmToken = currentToken;
                    console.log('✅ Token FCM obtenu');
                    return currentToken;
                } else {
                    console.log('Pas de token FCM disponible');
                    return null;
                }
            } catch (error) {
                console.error('Erreur obtention token FCM:', error);
                return null;
            }
        }

        // Sauvegarder le token et les préférences dans Firestore
        async function savePushSubscription() {
            if (!auth.currentUser) {
                console.log('Utilisateur non connecté - subscription non sauvegardée');
                return;
            }

            const token = await getFCMToken();
            if (!token) return;

            const schedules = window.getNotificationSchedules ? window.getNotificationSchedules() : [];

            try {
                const userDocRef = doc(db, 'users', auth.currentUser.uid);
                await updateDoc(userDocRef, {
                    fcmToken: token,
                    notificationSchedules: schedules,
                    notificationsUpdatedAt: serverTimestamp(),
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
                }).catch(async () => {
                    // Si le document n'existe pas, le créer
                    await setDoc(userDocRef, {
                        fcmToken: token,
                        notificationSchedules: schedules,
                        notificationsUpdatedAt: serverTimestamp(),
                        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
                    }, { merge: true });
                });

                console.log('Subscription push sauvegardée dans Firestore');
            } catch (error) {
                console.error('Erreur sauvegarde subscription:', error);
            }
        }

        // Supprimer la subscription
        async function removePushSubscription() {
            if (!auth.currentUser) return;

            try {
                const userDocRef = doc(db, 'users', auth.currentUser.uid);
                await updateDoc(userDocRef, {
                    fcmToken: null,
                    notificationSchedules: []
                });
                console.log('Subscription push supprimée');
            } catch (error) {
                console.error('Erreur suppression subscription:', error);
            }
        }

        // Exposer les fonctions globalement
        window.initializeFCM = initializeFCM;
        window.getFCMToken = getFCMToken;
        window.savePushSubscription = savePushSubscription;
        window.removePushSubscription = removePushSubscription;

        // Initialiser FCM au chargement
        initializeFCM();

        // ===== ALIMENTS COMMUNS (Base partagée) =====
        // Fonction pour récupérer un aliment par code-barres depuis Firestore
        window.getAlimentFromFirestore = async function(barcode) {
            try {
                const docRef = doc(db, 'aliments_communs', barcode);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    return docSnap.data();
                }
                return null;
            } catch (error) {
                console.error('Erreur lecture aliments_communs:', error);
                return null;
            }
        };

        // Fonction pour rechercher des aliments dans Firestore par texte
        window.searchAlimentsCommuns = async function(searchText) {
            try {

                // Si c'est un code-barres numérique, chercher par ID de document
                if (/^\d+$/.test(searchText)) {
                    const result = await window.getAlimentFromFirestore(searchText);
                    if (result) {
                        return [{
                            ...result,
                            barcode: searchText,
                            id: searchText
                        }];
                    }
                    return [];
                }

                // Sinon, faire une recherche textuelle (limité à 100 résultats pour meilleures chances)
                const q = query(collection(db, 'aliments_communs'), limit(100));
                const querySnapshot = await getDocs(q);

                const results = [];
                const searchLower = searchText.toLowerCase();
                let totalDocs = 0;

                querySnapshot.forEach((doc) => {
                    totalDocs++;
                    const data = doc.data();
                    // Filtrer côté client par nom
                    if (data.name && data.name.toLowerCase().includes(searchLower)) {
                        results.push({
                            ...data,
                            barcode: doc.id,
                            id: doc.id
                        });
                    }
                });

                return results;
            } catch (error) {
                console.error('❌ Erreur recherche aliments_communs:', error);
                return [];
            }
        };

        // Charger TOUS les aliments communautaires (pour affichage dans le filtre)
        window.loadCommunityFoods = async function() {
            if (!db) return [];

            try {
                const q = query(collection(db, 'aliments_communs'), limit(200));
                const querySnapshot = await getDocs(q);

                const results = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    if (data.name) {
                        results.push({
                            name: data.name,
                            calories: parseFloat(data.calories) || 0,
                            protein: parseFloat(data.proteins || data.protein) || 0,
                            carbs: parseFloat(data.carbs) || 0,
                            fat: parseFloat(data.fats || data.fat) || 0,
                            fiber: parseFloat(data.fibers || data.fiber) || 0,
                            category: data.category || 'autres',
                            barcode: doc.id,
                            unit: '100g',
                            custom: false,
                            fromFirestore: true
                        });
                    }
                });

                return results;
            } catch (error) {
                console.error('Erreur chargement aliments communautaires:', error);
                return [];
            }
        };

        // ===== CHARGER FOODDATABASE DEPUIS FIRESTORE (Source unique) =====
        window.loadFoodDatabaseFromFirestore = async function() {
            // Si déjà chargé, ne pas recharger
            if (foodDatabaseLoaded) {
                console.log('✅ foodDatabase déjà chargé depuis Firestore');
                return;
            }

            // Si Firebase pas disponible, utiliser fallback
            if (!db) {
                console.warn('⚠️ Firebase non disponible, utilisation de foodDatabaseLegacy');
                foodDatabase = [...foodDatabaseLegacy];
                foodDatabaseLoaded = true;
                return;
            }

            try {
                console.log('🔄 Chargement foodDatabase depuis Firestore...');

                // Charger TOUS les aliments de Firestore (sans limite ou avec limite élevée)
                const q = query(collection(db, 'aliments_communs'));
                const querySnapshot = await getDocs(q);

                // Réinitialiser foodDatabase
                foodDatabase = [];

                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    if (data.name) {
                        foodDatabase.push({
                            name: data.name,
                            calories: parseFloat(data.calories) || 0,
                            protein: parseFloat(data.proteins || data.protein) || 0,
                            carbs: parseFloat(data.carbs) || 0,
                            fat: parseFloat(data.fats || data.fat) || 0,
                            fiber: parseFloat(data.fibers || data.fiber) || 0,
                            category: data.category || 'autres',
                            barcode: doc.id,
                            unit: data.unit || '100g',
                            custom: false,
                            fromFirestore: true
                        });
                    }
                });

                foodDatabaseLoaded = true;
                console.log(`✅ foodDatabase chargé depuis Firestore: ${foodDatabase.length} aliments`);

            } catch (error) {
                console.error('❌ Erreur chargement foodDatabase depuis Firestore:', error);
                // Fallback vers la base legacy
                console.warn('⚠️ Utilisation de foodDatabaseLegacy en fallback');
                foodDatabase = [...foodDatabaseLegacy];
                foodDatabaseLoaded = true;
            }
        };

        // 🧪 FONCTION DE TEST - Utilise dans la console: testFirestoreSearch("3017620422003") ou testFirestoreSearch("nutella")
        window.testFirestoreSearch = async function(searchText) {

            if (!window.searchAlimentsCommuns) {
                console.error('❌ searchAlimentsCommuns non disponible');
                return;
            }

            const results = await window.searchAlimentsCommuns(searchText);


            if (results.length > 0) {
                results.forEach((item, index) => {
                    console.log(`\n   ${index + 1}. ${item.name}`);
                });
            } else {
            }

            return results;
        };

        // 🚀 AUTO-TEST au chargement pour vérifier connexion Firestore
        setTimeout(() => {
            if (typeof window.testFirestoreSearch === 'function') {
                // Test avec un code-barres connu (Nutella)
                window.testFirestoreSearch('3017620422003').then(() => {
                }).catch(err => {
                    console.error('❌ Auto-test échoué:', err);
                });
            }
        }, 2000); // Attendre 2s que Firebase soit complètement chargé

        // Fonction pour sauvegarder un aliment dans la base partagée Firestore
        window.saveToAlimentsCommuns = async function(food) {

            // Vérifier que l'utilisateur est connecté
            if (!auth.currentUser) {
                showToast('⚠️ Connecte-toi pour sauvegarder dans la base communautaire');
                return false;
            }

            if (!food.barcode) {
                return false;
            }

            try {
                // Créer un objet léger avec les données essentielles (tous en Number)
                const alimentData = {
                    name: String(food.name || 'Sans nom'),
                    calories: parseFloat(food.calories) || 0,
                    proteins: parseFloat(food.protein) || 0,
                    carbs: parseFloat(food.carbs) || 0,
                    fats: parseFloat(food.fat) || 0,
                    fibers: parseFloat(food.fiber) || 0,
                    category: String(food.category || 'autres'),
                    barcode: String(food.barcode),
                    unit: 'g',
                    updatedAt: serverTimestamp()
                };


                // Utiliser le code-barres comme ID du document
                const docRef = doc(db, 'aliments_communs', food.barcode);

                await setDoc(docRef, alimentData, { merge: true });

                console.log('Aliment sauvegardé dans aliments_communs:', alimentData.name);
                return true;
            } catch (error) {
                console.error('Erreur sauvegarde aliments_communs:', error);
                showToast('<i data-lucide="alert-circle" class="icon-inline"></i> Erreur lors de la sauvegarde', 'error');
                return false;
            }
        };

        // Keys to sync with Firestore - ALL important data
        const SYNC_KEYS = ['userProfile', 'foodLog', 'customFoods', 'macroTargets', 'allDailyMeals', 'trackingData', 'mealTemplates', 'weeklyPlan', 'favoriteFoods', 'appUsername', 'closedDays', 'advancedTrackingData', 'calcSettings', 'foodAliases', 'onboardingState', 'calc_goal'];

        // Debounce timer for sync
        let syncTimeout = null;
        let isSyncing = false;

        // ===== UI UPDATE FUNCTIONS =====
        function updateSyncBanner(user) {
            const indicator = document.getElementById('sync-indicator');
            const textEl = document.getElementById('sync-indicator-text');

            if (!indicator || !textEl) return;

            if (user) {
                // Connecté
                indicator.classList.add('connected');
                const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
                const displayName = userProfile.firstName || user.displayName?.split(' ')[0] || '';
                textEl.textContent = displayName ? `✓ ${displayName}` : '✓ Sync';
                indicator.title = 'Synchronisé avec le cloud';
            } else {
                // Non connecté
                indicator.classList.remove('connected');
                textEl.textContent = 'Local';
                indicator.title = 'Mode local - Cliquez pour vous connecter';
            }
        }

        function updateFirebaseUI(user) {
            const notConnected = document.getElementById('firebase-not-connected');
            const connected = document.getElementById('firebase-connected');
            const headerLoginBtn = document.getElementById('header-login-btn');
            const headerGreeting = document.getElementById('header-greeting');
            const headerSyncBtn = document.getElementById('header-sync-btn');
            const headerProfileWrapper = document.querySelector('.header-profile-wrapper');

            // Mise à jour bannière
            updateSyncBanner(user);

            if (user) {
                document.body.classList.add('user-connected');
                if (notConnected) notConnected.style.display = 'none';
                if (connected) connected.style.display = 'block';

                // Header: cacher login, montrer greeting + profile
                if (headerLoginBtn) headerLoginBtn.style.display = 'none';
                if (headerGreeting) headerGreeting.style.display = 'flex';
                if (headerSyncBtn) headerSyncBtn.style.display = 'flex';
                if (headerProfileWrapper) headerProfileWrapper.style.display = 'block';

                const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
                const displayName = userProfile.firstName || user.displayName?.split(' ')[0] || 'Utilisateur';
                const photoURL = user.photoURL || 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2310b981"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>';

                // Update header greeting
                const headerUsername = document.getElementById('header-username');
                if (headerUsername) headerUsername.textContent = displayName;

                // Update header profile photo
                const headerProfilePhoto = document.getElementById('header-profile-photo');
                if (headerProfilePhoto) headerProfilePhoto.src = photoURL;

                // Update user menu
                const userMenuName = document.getElementById('user-menu-name');
                const userMenuPhoto = document.getElementById('user-menu-photo');
                const userMenuUsername = document.getElementById('user-menu-username-text');
                if (userMenuName) userMenuName.textContent = displayName;
                if (userMenuUsername) userMenuUsername.textContent = displayName;
                if (userMenuPhoto) userMenuPhoto.src = photoURL;

                // Legacy elements in settings
                if (document.getElementById('firebase-user-photo')) {
                    document.getElementById('firebase-user-photo').src = photoURL;
                }
                if (document.getElementById('firebase-user-name')) {
                    document.getElementById('firebase-user-name').textContent = displayName;
                }
                if (document.getElementById('firebase-user-email')) {
                    document.getElementById('firebase-user-email').textContent = user.email;
                }

                // Update mobile drawer profile
                const mobileProfilePhoto = document.getElementById('mobile-profile-photo');
                const drawerUserPhoto = document.getElementById('drawer-user-photo');
                const drawerUserName = document.getElementById('drawer-user-name');
                if (mobileProfilePhoto) mobileProfilePhoto.src = photoURL;
                if (drawerUserPhoto) drawerUserPhoto.src = photoURL;
                if (drawerUserName) drawerUserName.textContent = displayName;

                if (typeof lucide !== 'undefined') lucide.createIcons();
            } else {
                document.body.classList.remove('user-connected');
                if (notConnected) notConnected.style.display = 'block';
                if (connected) connected.style.display = 'none';

                // Header: montrer login, cacher greeting + profile
                if (headerLoginBtn) headerLoginBtn.style.display = 'flex';
                if (headerGreeting) headerGreeting.style.display = 'none';
                if (headerSyncBtn) headerSyncBtn.style.display = 'none';
                if (headerProfileWrapper) headerProfileWrapper.style.display = 'none';
            }
        }

        // Fonction pour demander le prénom avant inscription
        function askForFirstName() {
            console.log('askForFirstName called');
            return new Promise((resolve) => {
                console.log('customPrompt available:', typeof window.customPrompt === 'function');
                if (typeof window.customPrompt === 'function') {
                    // Utiliser le prompt personnalisé si disponible
                    const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
                    const existingName = userProfile.firstName || '';

                    window.customPrompt('Bienvenue sur NutriTrack !', 'Entre ton prénom pour personnaliser ton expérience :', existingName || 'Ton prénom')
                        .then(name => resolve(name));
                } else {
                    // Fallback vers prompt natif
                    console.log('Using native prompt');
                    const name = prompt('Entre ton prénom pour personnaliser ton expérience :');
                    resolve(name);
                }
            });
        }

        // Ajouter fonction customPrompt globale si elle n'existe pas
        if (typeof window.customPrompt !== 'function') {
            window.customPrompt = function(title, message, placeholder) {
                return new Promise((resolve) => {
                    const modal = document.createElement('div');
                    modal.className = 'custom-popup-overlay active';
                    modal.innerHTML = `
                        <div class="custom-popup">
                            <h3>${title}</h3>
                            <p>${message}</p>
                            <input type="text" id="prompt-input-fb" placeholder="${placeholder || ''}"
                                style="width: 100%; padding: var(--space-md); background: var(--bg-tertiary); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: var(--radius-md); color: var(--text-primary); font-size: 1rem; margin-bottom: var(--space-md);"
                                maxlength="20">
                            <div class="custom-popup-buttons">
                                <button id="prompt-cancel-fb" class="custom-popup-btn cancel">Annuler</button>
                                <button id="prompt-confirm-fb" class="custom-popup-btn confirm">Confirmer</button>
                            </div>
                        </div>
                    `;
                    document.body.appendChild(modal);

                    const input = modal.querySelector('#prompt-input-fb');
                    input.focus();

                    const cleanup = (value) => {
                        modal.remove();
                        resolve(value);
                    };

                    modal.querySelector('#prompt-confirm-fb').onclick = () => cleanup(input.value.trim());
                    modal.querySelector('#prompt-cancel-fb').onclick = () => cleanup(null);
                    input.onkeypress = (e) => { if (e.key === 'Enter') cleanup(input.value.trim()); };
                    modal.onclick = (e) => { if (e.target === modal) cleanup(null); };
                });
            };
        }

        function updateSyncStatus(message) {
            const statusEl = document.getElementById('firebase-sync-status');
            if (statusEl) {
                statusEl.textContent = message;
            }
        }

        // ===== FIRESTORE SYNC FUNCTIONS =====
        async function syncToFirestore(user) {
            if (!user || isSyncing) return;
            isSyncing = true;

            try {
                const data = {};
                SYNC_KEYS.forEach(key => {
                    const value = localStorage.getItem(key);
                    if (value) {
                        data[key] = value;
                    }
                });

                // Add additional keys that might be useful
                const additionalKeys = ['macroTargets', 'allDailyMeals', 'trackingData', 'mealTemplates', 'weeklyPlan'];
                additionalKeys.forEach(key => {
                    const value = localStorage.getItem(key);
                    if (value) {
                        data[key] = value;
                    }
                });

                // Add user info from Firebase Auth
                data.email = user.email || null;
                data.displayName = user.displayName || null;

                // Extract firstName from userProfile if available
                const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
                if (userProfile.firstName) {
                    data.firstName = userProfile.firstName;
                }
                if (userProfile.lastName) {
                    data.lastName = userProfile.lastName;
                }

                // Use serverTimestamp for lastSync instead of ISO string
                data.lastSync = serverTimestamp();

                // Check if document exists to set createdAt only on first sync
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);

                const updateData = {
                    ...data,
                    updatedAt: serverTimestamp()
                };

                // Only set createdAt if document doesn't exist yet
                if (!docSnap.exists()) {
                    updateData.createdAt = serverTimestamp();
                }

                await setDoc(docRef, updateData, { merge: true });

                const now = new Date().toLocaleString('fr-FR', {
                    day: '2-digit',
                    month: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                });
                updateSyncStatus(`Dernière sync: ${now}`);

            } catch (error) {
                console.error('Erreur sync Firestore:', error);
                updateSyncStatus('Erreur de synchronisation');
            } finally {
                isSyncing = false;
            }
        }

        async function loadFromFirestore(user) {
            if (!user) return null;

            try {
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    return docSnap.data();
                }
                return null;
            } catch (error) {
                console.error('Erreur lecture Firestore:', error);
                return null;
            }
        }

        function restoreDataFromCloud(cloudData, silent = false) {
            const allKeys = [...SYNC_KEYS]; // All synced keys

            allKeys.forEach(key => {
                if (cloudData[key]) {
                    // Use original setItem to avoid triggering sync
                    originalSetItem.call(localStorage, key, cloudData[key]);
                }
            });

            // Recharger les mealTemplates en mémoire immédiatement
            if (cloudData.mealTemplates && typeof loadMealTemplates === 'function') {
                loadMealTemplates();
            }

            // Sync firstName from userProfile to appUsername for header display
            try {
                const restoredProfile = JSON.parse(cloudData.userProfile || '{}');
                if (restoredProfile.firstName) {
                    originalSetItem.call(localStorage, 'appUsername', restoredProfile.firstName);
                }
            } catch (e) { /* ignore parse errors */ }

            // Reload page SEULEMENT si restauration manuelle (pas lors de l'init)
            if (!silent) {
                if (typeof showToast === 'function') {
                    showToast('<i data-lucide="check-circle" class="icon-inline"></i> Données restaurées depuis le cloud !', 'success');
                }
                setTimeout(() => location.reload(), 1500);
            }
        }

        // ===== LOCALSTORAGE HOOK =====
        const originalSetItem = localStorage.setItem.bind(localStorage);
        const keysToWatch = [...SYNC_KEYS]; // All keys from SYNC_KEYS are watched

        localStorage.setItem = function(key, value) {
            originalSetItem(key, value);

            // If connected and key is in watch list, sync to Firestore with debounce
            if (keysToWatch.includes(key) && auth.currentUser) {
                clearTimeout(syncTimeout);
                syncTimeout = setTimeout(() => {
                    syncToFirestore(auth.currentUser);
                }, 2000); // Debounce 2 seconds
            }
        };

        // ===== AUTH FUNCTIONS (exposed globally) =====
        window.firebaseSignIn = async function() {
            try {
                // Connexion Google directe
                const result = await signInWithPopup(auth, provider);
                const user = result.user;

                // Utiliser le prénom Google si pas de prénom local
                const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
                if (!userProfile.firstName && user.displayName) {
                    const googleFirstName = user.displayName.split(' ')[0];
                    userProfile.firstName = googleFirstName;
                    localStorage.setItem('userProfile', JSON.stringify(userProfile));
                    localStorage.setItem('appUsername', googleFirstName);
                }

                // Check if cloud data exists
                const cloudData = await loadFromFirestore(user);

                if (cloudData && cloudData.lastSync) {
                    // Cloud data exists - ask user what to do
                    const hasLocalData = SYNC_KEYS.some(key => localStorage.getItem(key));

                    if (hasLocalData) {
                        // Both local and cloud data exist
                        if (typeof customConfirm === 'function') {
                            customConfirm(
                                'Données trouvées dans le cloud',
                                `Des données existent déjà sur ce compte (sync: ${new Date(cloudData.lastSync).toLocaleDateString('fr-FR')}). Veux-tu les restaurer et remplacer tes données locales ?`,
                                { confirmText: 'Restaurer', cancelText: 'Garder local', isDanger: false }
                            ).then((restore) => {
                                if (restore) {
                                    restoreDataFromCloud(cloudData);
                                } else {
                                    // Keep local data and sync to cloud
                                    syncToFirestore(user);
                                    if (typeof showToast === 'function') {
                                        showToast('<i data-lucide="cloud-upload" class="icon-inline"></i> Données locales envoyées vers le cloud');
                                    }
                                }
                            });
                        } else {
                            // Fallback without custom confirm
                            if (confirm(`Des données existent déjà sur ce compte. Voulez-vous les restaurer ?`)) {
                                restoreDataFromCloud(cloudData);
                            } else {
                                syncToFirestore(user);
                            }
                        }
                    } else {
                        // No local data, restore from cloud
                        restoreDataFromCloud(cloudData);
                    }
                } else {
                    // No cloud data, upload local
                    syncToFirestore(user);
                    if (typeof showToast === 'function') {
                        showToast('<i data-lucide="check-circle" class="icon-inline"></i> Connecté ! Tes données sont synchronisées.');
                    }
                }

            } catch (error) {
                console.error('Erreur connexion Google:', error);
                if (typeof showToast === 'function') {
                    showToast('<i data-lucide="x-circle" class="icon-inline"></i> Erreur de connexion', 'error');
                }
            }
        };

        window.firebaseSignOut = async function() {
            // Modal de confirmation avant déconnexion
            if (typeof customConfirm === 'function') {
                customConfirm(
                    'Se déconnecter ?',
                    'Tu seras déconnecté du cloud. Tes données locales seront conservées mais ne seront plus synchronisées.',
                    { confirmText: 'Déconnexion', cancelText: 'Annuler', isDanger: true }
                ).then(async (confirmed) => {
                    if (!confirmed) return;
                    try {
                        await signOut(auth);
                        if (typeof showToast === 'function') {
                            showToast('<i data-lucide="log-out" class="icon-inline"></i> Déconnecté');
                        }
                        // Rediriger vers la landing page
                        window.appInitialized = false;
                        window.location.reload();
                    } catch (error) {
                        console.error('Erreur déconnexion:', error);
                    }
                });
            } else {
                // Fallback sans modal
                if (confirm('Voulez-vous vous déconnecter ?')) {
                    try {
                        await signOut(auth);
                        // Rediriger vers la landing page
                        window.appInitialized = false;
                        window.location.reload();
                    } catch (error) {
                        console.error('Erreur déconnexion:', error);
                    }
                }
            }
        };

        window.firebaseForceSync = async function() {
            if (auth.currentUser) {
                updateSyncStatus('Synchronisation en cours...');
                await syncToFirestore(auth.currentUser);
                if (typeof showToast === 'function') {
                    showToast('<i data-lucide="check-circle" class="icon-inline"></i> Synchronisation terminée !');
                }
            }
        };

        window.firebaseRestoreFromCloud = async function() {
            if (!auth.currentUser) return;

            const cloudData = await loadFromFirestore(auth.currentUser);
            if (cloudData) {
                if (typeof customConfirm === 'function') {
                    customConfirm(
                        'Restaurer depuis le cloud ?',
                        'Tes données locales seront remplacées par celles du cloud. Cette action est irréversible.',
                        true
                    ).then((confirmed) => {
                        if (confirmed) {
                            restoreDataFromCloud(cloudData);
                        }
                    });
                } else if (confirm('Tes données locales seront remplacées. Continuer ?')) {
                    restoreDataFromCloud(cloudData);
                }
            } else {
                if (typeof showToast === 'function') {
                    showToast('<i data-lucide="info" class="icon-inline"></i> Aucune donnée dans le cloud');
                }
            }
        };

        // Delete cloud data for current user
        window.firebaseDeleteCloudData = async function() {
            if (!auth.currentUser) {
                return false;
            }
            try {
                const userRef = doc(db, 'users', auth.currentUser.uid);
                await deleteDoc(userRef);
                return true;
            } catch (error) {
                console.error('Erreur suppression cloud:', error);
                return false;
            }
        };

        // Check if user is connected to Firebase
        window.isFirebaseConnected = function() {
            return !!auth.currentUser;
        };

        // ===== AUTH STATE LISTENER - CONTRÔLE L'AFFICHAGE INITIAL =====
        onAuthStateChanged(auth, (user) => {
            const initUI = async () => {
                // Mettre à jour l'UI Firebase (header, boutons, etc.)
                updateFirebaseUI(user);

                // Mettre à jour la visibilité du bouton admin
                updateAdminVisibility();

                if (user) {
                    // USER CONNECTÉ → Charger données + afficher l'app
                    console.log('✅ User connecté:', user.email);

                    // Charger les données depuis Firestore (source de vérité)
                    const cloudData = await loadFromFirestore(user);

                    if (cloudData && cloudData.lastSync) {
                        const syncDate = new Date(cloudData.lastSync).toLocaleString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                        });
                        updateSyncStatus(`Dernière sync: ${syncDate}`);

                        // Restaurer les données depuis le cloud SILENCIEUSEMENT (pas de reload lors de l'init)
                        if (cloudData.allDailyMeals || cloudData.trackingData) {
                            restoreDataFromCloud(cloudData, true); // silent = true
                        }
                    }

                    // Afficher l'app + cacher splash (SEULEMENT si pas déjà fait)
                    if (typeof window.showApp === 'function') {
                        window.showApp(user);
                    }
                } else {
                    // USER NON CONNECTÉ → Afficher landing page (écran de login)
                    console.log('❌ User non connecté');

                    // Afficher landing page + cacher splash (SEULEMENT si pas déjà fait)
                    if (typeof window.showLanding === 'function') {
                        window.showLanding();
                    }
                }

                // Rafraîchir les icônes Lucide
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            };

            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initUI);
            } else {
                // Lancer immédiatement si DOM déjà prêt
                initUI();
            }
        });

        // Log initialization

        // ===== ADMIN & FEEDBACK SYSTEM =====
        const ADMIN_UID = 'qEuqSbWO73OwTEwL6LhEILS5djD2';
        let adminFeedbacksCache = [];
        let adminCurrentPage = 1;
        const FEEDBACKS_PER_PAGE = 20;

        // Check if current user is admin
        function isAdmin() {
            return auth.currentUser && auth.currentUser.uid === ADMIN_UID;
        }
        // Expose globally for access from other scopes
        window.isAdmin = isAdmin;

        // Show/hide admin button based on user
        function updateAdminVisibility() {
            const isUserAdmin = isAdmin();
            // Sidebar button (desktop)
            const adminBtn = document.getElementById('admin-sidebar-btn');
            if (adminBtn) {
                adminBtn.style.display = isUserAdmin ? 'flex' : 'none';
            }
            // Drawer button (mobile)
            const drawerAdminBtn = document.getElementById('drawer-admin-btn');
            if (drawerAdminBtn) {
                drawerAdminBtn.style.display = isUserAdmin ? 'flex' : 'none';
            }
        }

        // NOTE: updateAdminVisibility est maintenant appelé dans le listener onAuthStateChanged principal (ligne 6143)

        // ===== FEEDBACK MODAL =====
        window.openFeedbackModal = function() {
            document.getElementById('feedback-modal').classList.add('active');
            document.body.style.overflow = 'hidden';
            if (typeof lucide !== 'undefined') lucide.createIcons();
        };

        window.closeFeedbackModal = function() {
            document.getElementById('feedback-modal').classList.remove('active');
            document.body.style.overflow = '';
            // Reset form
            document.getElementById('feedback-type').value = '';
            document.getElementById('feedback-tab').value = '';
            document.getElementById('feedback-reproduction').value = '';
            document.getElementById('feedback-description').value = '';
            document.getElementById('reproduction-field').style.display = 'none';
        };

        window.toggleReproductionField = function() {
            const type = document.getElementById('feedback-type').value;
            document.getElementById('reproduction-field').style.display = type === 'bug' ? 'block' : 'none';
        };

        window.submitFeedback = async function() {
            const type = document.getElementById('feedback-type').value;
            const tab = document.getElementById('feedback-tab').value;
            const reproduction = document.getElementById('feedback-reproduction').value;
            const description = document.getElementById('feedback-description').value;

            if (!type || !tab || !description.trim()) {
                if (typeof showToast === 'function') {
                    showToast('<i data-lucide="alert-circle" class="icon-inline"></i> Remplis tous les champs obligatoires');
                }
                return;
            }

            try {
                // Detect device type and OS
                const ua = navigator.userAgent;
                let deviceType = 'Unknown';
                let deviceOS = 'Unknown';

                // Detect OS
                if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
                    deviceType = 'Mobile';
                    deviceOS = 'iOS';
                } else if (/android/i.test(ua)) {
                    deviceType = 'Mobile';
                    deviceOS = 'Android';
                } else if (/Windows/i.test(ua)) {
                    deviceType = 'PC';
                    deviceOS = 'Windows';
                } else if (/Mac/i.test(ua)) {
                    deviceType = 'PC';
                    deviceOS = 'macOS';
                } else if (/Linux/i.test(ua)) {
                    deviceType = 'PC';
                    deviceOS = 'Linux';
                }

                const feedbackData = {
                    type: type,
                    tab: tab,
                    reproduction: type === 'bug' ? reproduction : null,
                    description: description.trim(),
                    status: 'new',
                    createdAt: serverTimestamp(),
                    userAgent: navigator.userAgent,
                    deviceType: deviceType,
                    deviceOS: deviceOS,
                    userId: auth.currentUser ? auth.currentUser.uid : null,
                    userEmail: auth.currentUser ? auth.currentUser.email : null
                };

                await setDoc(doc(collection(db, 'feedbacks')), feedbackData);

                closeFeedbackModal();
                if (typeof showToast === 'function') {
                    showToast('<i data-lucide="check-circle" class="icon-inline"></i> Merci pour ton feedback !');
                }
            } catch (error) {
                console.error('Erreur envoi feedback:', error);
                if (typeof showToast === 'function') {
                    showToast('<i data-lucide="x-circle" class="icon-inline"></i> Erreur lors de l\'envoi', 'error');
                }
            }
        };

        // ===== ADMIN FEEDBACKS =====
        window.loadAdminFeedbacks = async function() {
            if (!isAdmin()) return;

            const container = document.getElementById('admin-feedbacks-list');
            container.innerHTML = '<div style="text-align: center; color: var(--text-secondary); padding: var(--space-3xl);"><i data-lucide="loader" style="width: 32px; height: 32px; animation: spin 1s linear infinite;"></i><p>Chargement...</p></div>';

            try {
                const filterType = document.getElementById('admin-filter-type')?.value || 'all';
                const filterStatus = document.getElementById('admin-filter-status')?.value || 'all';
                const filterSearch = document.getElementById('admin-filter-search')?.value.toLowerCase() || '';
                const filterDate = document.getElementById('admin-filter-date')?.value || '';

                // Fetch all feedbacks
                const q = query(collection(db, 'feedbacks'));
                const querySnapshot = await getDocs(q);

                let feedbacks = [];
                querySnapshot.forEach((doc) => {
                    feedbacks.push({ id: doc.id, ...doc.data() });
                });

                // Sort by createdAt descending (newest first)
                feedbacks.sort((a, b) => {
                    const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(0);
                    const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(0);
                    return dateB - dateA;
                });

                // Filter by type
                if (filterType !== 'all') {
                    feedbacks = feedbacks.filter(f => f.type === filterType);
                }

                // Filter by status
                if (filterStatus !== 'all') {
                    feedbacks = feedbacks.filter(f => f.status === filterStatus);
                }

                // Filter by search (email)
                if (filterSearch) {
                    feedbacks = feedbacks.filter(f =>
                        (f.userEmail && f.userEmail.toLowerCase().includes(filterSearch)) ||
                        (f.description && f.description.toLowerCase().includes(filterSearch))
                    );
                }

                // Filter by date
                if (filterDate) {
                    feedbacks = feedbacks.filter(f => {
                        if (!f.createdAt?.toDate) return false;
                        const feedbackDate = f.createdAt.toDate().toISOString().split('T')[0];
                        return feedbackDate === filterDate;
                    });
                }

                // Update stats (use all feedbacks before search filter for accurate stats)
                const allFeedbacks = [];
                querySnapshot.forEach((doc) => {
                    allFeedbacks.push({ id: doc.id, ...doc.data() });
                });
                updateAdminStats(allFeedbacks);

                // Store in cache
                adminFeedbacksCache = feedbacks;

                // Render
                renderAdminFeedbacks(feedbacks);

            } catch (error) {
                console.error('Erreur chargement feedbacks:', error);
                container.innerHTML = '<div style="text-align: center; color: var(--accent-danger); padding: var(--space-3xl);"><i data-lucide="alert-circle" style="width: 32px; height: 32px;"></i><p>Erreur de chargement</p></div>';
            }

            if (typeof lucide !== 'undefined') lucide.createIcons();
        };

        function updateAdminStats(feedbacks) {
            document.getElementById('stat-total').textContent = feedbacks.length;
            document.getElementById('stat-bugs').textContent = feedbacks.filter(f => f.type === 'bug').length;
            document.getElementById('stat-suggestions').textContent = feedbacks.filter(f => f.type === 'suggestion').length;
            document.getElementById('stat-new').textContent = feedbacks.filter(f => f.status === 'new').length;
            document.getElementById('feedbacks-count').textContent = feedbacks.length;
        }

        function renderAdminFeedbacks(feedbacks) {
            const container = document.getElementById('admin-feedbacks-list');

            if (feedbacks.length === 0) {
                container.innerHTML = '<div style="text-align: center; color: var(--text-secondary); padding: var(--space-3xl);"><i data-lucide="inbox" style="width: 48px; height: 48px; opacity: 0.5;"></i><p>Aucun feedback trouvé</p></div>';
                return;
            }

            // Pagination
            const start = (adminCurrentPage - 1) * FEEDBACKS_PER_PAGE;
            const end = start + FEEDBACKS_PER_PAGE;
            const paginated = feedbacks.slice(start, end);

            container.innerHTML = paginated.map(feedback => {
                const date = feedback.createdAt?.toDate ? feedback.createdAt.toDate().toLocaleString('fr-FR', {
                    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
                }) : 'Date inconnue';

                const typeIcons = { bug: '🐛', suggestion: '💡', question: '❓' };
                const typeColors = { bug: 'var(--accent-danger)', suggestion: 'var(--accent-carbs)', question: 'var(--accent-ui)' };
                const statusIcons = { new: '🟢', read: '🔵', resolved: '✅' };
                const tabLabels = {
                    home: '🏠 Accueil', calculator: '🧮 Calculateur', meals: '🍽️ Mes Repas',
                    planner: '📅 Planning', foods: '🍎 Base d\'Aliments', 'meal-templates': '📋 Repas Types',
                    tracking: '📊 Suivi', settings: '⚙️ Paramètres', other: '🔧 Autre'
                };

                return `
                    <div class="feedback-item" style="background: var(--bg-tertiary); border-radius: var(--radius-md); padding: var(--space-lg); border-left: 4px solid ${typeColors[feedback.type] || 'var(--accent-ui)'};">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-md);">
                            <div style="display: flex; gap: var(--space-sm); align-items: center; flex-wrap: wrap;">
                                <span style="font-size: 1.2rem;">${typeIcons[feedback.type] || '📝'}</span>
                                <span style="background: ${typeColors[feedback.type]}22; color: ${typeColors[feedback.type]}; padding: 2px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: 600;">${feedback.type?.toUpperCase()}</span>
                                <span style="color: var(--text-secondary); font-size: 0.85rem;">${tabLabels[feedback.tab] || feedback.tab}</span>
                                <span style="font-size: 0.9rem;">${statusIcons[feedback.status] || '⚪'}</span>
                            </div>
                            <span style="color: var(--text-secondary); font-size: 0.8rem;">${date}</span>
                        </div>
                        <div style="color: var(--text-primary); line-height: 1.6; margin-bottom: var(--space-md); white-space: pre-wrap;">${escapeHtml(feedback.description)}</div>
                        ${feedback.reproduction ? `<div style="background: rgba(239, 68, 68, 0.1); padding: var(--space-sm); border-radius: var(--radius-sm); margin-bottom: var(--space-md); font-size: 0.85rem;"><strong>Reproduction:</strong> ${escapeHtml(feedback.reproduction)}</div>` : ''}
                        <div style="display: flex; gap: var(--space-sm); flex-wrap: wrap;">
                            ${feedback.status === 'new' ? `<button class="btn btn-sm btn-info" onclick="updateFeedbackStatus('${feedback.id}', 'read')">Marquer lu</button>` : ''}
                            ${feedback.status !== 'resolved' ? `<button class="btn btn-sm" onclick="updateFeedbackStatus('${feedback.id}', 'resolved')">Résolu</button>` : ''}
                            <button class="btn btn-danger btn-sm" onclick="deleteFeedback('${feedback.id}')">Supprimer</button>
                        </div>
                        <div style="margin-top: var(--space-sm); font-size: 0.75rem; color: var(--text-secondary); display: flex; gap: var(--space-md); flex-wrap: wrap;">
                            ${feedback.userEmail ? `<span>👤 ${feedback.userEmail}</span>` : ''}
                            ${feedback.deviceType && feedback.deviceOS ? `<span>📱 ${feedback.deviceType} - ${feedback.deviceOS}</span>` : ''}
                        </div>
                    </div>
                `;
            }).join('');

            // Pagination controls
            const totalPages = Math.ceil(feedbacks.length / FEEDBACKS_PER_PAGE);
            const paginationContainer = document.getElementById('admin-pagination');
            if (totalPages > 1) {
                paginationContainer.innerHTML = `
                    <button class="btn" ${adminCurrentPage === 1 ? 'disabled' : ''} onclick="adminChangePage(${adminCurrentPage - 1})" style="padding: 8px 16px;">← Précédent</button>
                    <span style="color: var(--text-secondary);">Page ${adminCurrentPage} / ${totalPages}</span>
                    <button class="btn" ${adminCurrentPage === totalPages ? 'disabled' : ''} onclick="adminChangePage(${adminCurrentPage + 1})" style="padding: 8px 16px;">Suivant →</button>
                `;
            } else {
                paginationContainer.innerHTML = '';
            }

            if (typeof lucide !== 'undefined') lucide.createIcons();
        }

        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        window.adminChangePage = function(page) {
            adminCurrentPage = page;
            renderAdminFeedbacks(adminFeedbacksCache);
        };

        window.updateFeedbackStatus = async function(feedbackId, newStatus) {
            if (!isAdmin()) return;

            try {
                await setDoc(doc(db, 'feedbacks', feedbackId), { status: newStatus }, { merge: true });
                loadAdminFeedbacks();
                if (typeof showToast === 'function') {
                    showToast('<i data-lucide="check-circle" class="icon-inline"></i> Statut mis à jour');
                }
            } catch (error) {
                console.error('Erreur mise à jour statut:', error);
            }
        };

        window.deleteFeedback = async function(feedbackId) {
            if (!isAdmin()) return;

            if (!confirm('Supprimer ce feedback ?')) return;

            try {
                await deleteDoc(doc(db, 'feedbacks', feedbackId));
                await logAdminAction('delete_feedback', { feedbackId });
                loadAdminFeedbacks();
                if (typeof showToast === 'function') {
                    showToast('<i data-lucide="trash-2" class="icon-inline"></i> Feedback supprimé');
                }
            } catch (error) {
                console.error('Erreur suppression feedback:', error);
            }
        };

        // ===== ADMIN SECTION NAVIGATION =====
        window.showAdminSection = function(section) {
            if (!isAdmin()) return;

            // Hide all sections
            document.querySelectorAll('.admin-section').forEach(el => el.style.display = 'none');

            // Show selected section
            const sectionEl = document.getElementById(`admin-section-${section}`);
            if (sectionEl) sectionEl.style.display = 'block';

            // Update nav buttons
            document.querySelectorAll('.admin-subnav-btn').forEach(btn => {
                if (btn.dataset.section === section) {
                    btn.style.background = 'var(--accent-purple)';
                    btn.style.color = 'white';
                    btn.classList.add('active');
                } else {
                    btn.style.background = 'var(--bg-tertiary)';
                    btn.style.color = 'var(--text-secondary)';
                    btn.classList.remove('active');
                }
            });

            // Load data for the section
            switch(section) {
                case 'dashboard':
                    loadAdminDashboard();
                    break;
                case 'feedbacks':
                    loadAdminFeedbacks();
                    break;
                case 'users':
                    loadAdminUsers();
                    break;
                case 'foods':
                    loadAdminFoods();
                    break;
                case 'settings':
                    loadAdminSettings();
                    break;
            }

            if (typeof lucide !== 'undefined') lucide.createIcons();
        };

        // ===== ADMIN DASHBOARD =====
        window.loadAdminDashboard = async function() {
            if (!isAdmin()) return;

            try {
                // Count users (from Firestore users collection)
                const usersSnap = await getDocs(collection(db, 'users'));
                const totalUsers = usersSnap.size;

                // Count active users (7 days)
                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                let activeUsers7d = 0;
                usersSnap.forEach(doc => {
                    const data = doc.data();
                    if (data.lastSync) {
                        const lastSync = data.lastSync.toDate ? data.lastSync.toDate() : new Date(data.lastSync);
                        if (lastSync >= sevenDaysAgo) activeUsers7d++;
                    }
                });

                // Count feedbacks non résolus
                const feedbacksSnap = await getDocs(collection(db, 'feedbacks'));
                let unresolvedFeedbacks = 0;
                feedbacksSnap.forEach(doc => {
                    if (doc.data().status !== 'resolved') unresolvedFeedbacks++;
                });

                // Count aliments communs
                const foodsSnap = await getDocs(collection(db, 'aliments_communs'));
                const totalFoods = foodsSnap.size;

                // Update stats
                document.getElementById('stat-users-total').textContent = totalUsers;
                document.getElementById('stat-users-active').textContent = activeUsers7d;
                document.getElementById('stat-feedbacks-unresolved').textContent = unresolvedFeedbacks;
                document.getElementById('stat-foods-total').textContent = totalFoods;

                // Load 5 derniers feedbacks
                const feedbacksQuery = query(collection(db, 'feedbacks'), limit(5));
                const recentFeedbacksSnap = await getDocs(feedbacksQuery);
                const recentFeedbacks = [];
                recentFeedbacksSnap.forEach(doc => {
                    recentFeedbacks.push({ id: doc.id, ...doc.data() });
                });

                // Sort by date
                recentFeedbacks.sort((a, b) => {
                    const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(0);
                    const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(0);
                    return dateB - dateA;
                });

                // Render recent feedbacks
                const container = document.getElementById('dashboard-recent-feedbacks');
                if (recentFeedbacks.length === 0) {
                    container.innerHTML = '<div style="text-align: center; color: var(--text-secondary); padding: var(--space-xl);"><p>Aucun feedback récent</p></div>';
                } else {
                    container.innerHTML = recentFeedbacks.slice(0, 5).map(f => {
                        const date = f.createdAt?.toDate ? f.createdAt.toDate().toLocaleString('fr-FR', {
                            day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
                        }) : 'Date inconnue';
                        const typeIcons = { bug: '🐛', suggestion: '💡', question: '❓' };
                        return `
                            <div style="background: var(--bg-tertiary); padding: var(--space-md); border-radius: var(--radius-md); margin-bottom: var(--space-sm);">
                                <div style="display: flex; justify-content: space-between; margin-bottom: var(--space-xs);">
                                    <span>${typeIcons[f.type] || '📝'} ${f.type?.toUpperCase()}</span>
                                    <span style="color: var(--text-secondary); font-size: 0.85rem;">${date}</span>
                                </div>
                                <div style="color: var(--text-secondary); font-size: 0.9rem;">${escapeHtml(f.description.substring(0, 100))}${f.description.length > 100 ? '...' : ''}</div>
                            </div>
                        `;
                    }).join('');
                }

            } catch (error) {
                console.error('Erreur chargement dashboard:', error);
            }

            if (typeof lucide !== 'undefined') lucide.createIcons();
        };

        // ===== ADMIN USERS =====
        let adminUsersCache = [];
        let adminUsersPage = 1;
        const USERS_PER_PAGE = 50;

        window.loadAdminUsers = async function() {
            if (!isAdmin()) return;

            const container = document.getElementById('admin-users-list');
            container.innerHTML = '<div style="text-align: center; color: var(--text-secondary); padding: var(--space-3xl);"><i data-lucide="loader" style="width: 32px; height: 32px;"></i><p>Chargement...</p></div>';

            try {
                const usersSnap = await getDocs(collection(db, 'users'));
                let users = [];
                usersSnap.forEach(doc => {
                    users.push({ uid: doc.id, ...doc.data() });
                });

                // Apply search filter
                const searchTerm = document.getElementById('users-filter-search')?.value.toLowerCase() || '';
                if (searchTerm) {
                    users = users.filter(u =>
                        (u.email && u.email.toLowerCase().includes(searchTerm)) ||
                        (u.displayName && u.displayName.toLowerCase().includes(searchTerm))
                    );
                }

                // Apply sort
                const sortBy = document.getElementById('users-filter-sort')?.value || 'newest';
                users.sort((a, b) => {
                    if (sortBy === 'newest') {
                        const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(0);
                        const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(0);
                        return dateB - dateA;
                    } else if (sortBy === 'oldest') {
                        const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(0);
                        const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(0);
                        return dateA - dateB;
                    } else if (sortBy === 'lastLogin') {
                        const dateA = a.lastSync?.toDate ? a.lastSync.toDate() : new Date(0);
                        const dateB = b.lastSync?.toDate ? b.lastSync.toDate() : new Date(0);
                        return dateB - dateA;
                    }
                    return 0;
                });

                // Update stats
                const now = new Date();
                const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

                const active7d = users.filter(u => {
                    if (!u.lastSync) return false;
                    const lastSync = u.lastSync.toDate ? u.lastSync.toDate() : new Date(u.lastSync);
                    return lastSync >= sevenDaysAgo;
                }).length;

                const active30d = users.filter(u => {
                    if (!u.lastSync) return false;
                    const lastSync = u.lastSync.toDate ? u.lastSync.toDate() : new Date(u.lastSync);
                    return lastSync >= thirtyDaysAgo;
                }).length;

                document.getElementById('users-stat-total').textContent = users.length;
                document.getElementById('users-stat-active-7d').textContent = active7d;
                document.getElementById('users-stat-active-30d').textContent = active30d;
                document.getElementById('users-count').textContent = users.length;

                adminUsersCache = users;
                renderAdminUsers(users);

            } catch (error) {
                console.error('Erreur chargement users:', error);
                container.innerHTML = '<div style="text-align: center; color: var(--accent-danger); padding: var(--space-3xl);"><p>Erreur de chargement</p></div>';
            }

            if (typeof lucide !== 'undefined') lucide.createIcons();
        };

        function renderAdminUsers(users) {
            const container = document.getElementById('admin-users-list');

            if (users.length === 0) {
                container.innerHTML = '<div style="text-align: center; color: var(--text-secondary); padding: var(--space-3xl);"><p>Aucun utilisateur trouvé</p></div>';
                return;
            }

            // Pagination
            const start = (adminUsersPage - 1) * USERS_PER_PAGE;
            const end = start + USERS_PER_PAGE;
            const paginated = users.slice(start, end);

            container.innerHTML = paginated.map(user => {
                // Handle lastSync - can be either Firestore Timestamp or ISO string
                let lastSync = 'Jamais';
                if (user.lastSync) {
                    try {
                        const lastSyncDate = user.lastSync?.toDate ? user.lastSync.toDate() : new Date(user.lastSync);
                        lastSync = lastSyncDate.toLocaleString('fr-FR', {
                            day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
                        });
                    } catch (e) {
                        lastSync = 'Erreur';
                    }
                }

                const createdAt = user.createdAt?.toDate ? user.createdAt.toDate().toLocaleDateString('fr-FR') : '-';

                // Count unique days with meals (parse allDailyMeals if it's a string)
                let mealsCount = 0;
                if (user.allDailyMeals) {
                    try {
                        const allDailyMeals = typeof user.allDailyMeals === 'string'
                            ? JSON.parse(user.allDailyMeals)
                            : user.allDailyMeals;
                        mealsCount = Object.keys(allDailyMeals).length;
                    } catch (e) {
                        mealsCount = 0;
                    }
                }

                // Display name priority: firstName > displayName > email > 'Utilisateur inconnu'
                const displayName = user.firstName || user.displayName || user.email || 'Utilisateur inconnu';

                return `
                    <div style="background: var(--bg-tertiary); border-radius: var(--radius-md); padding: var(--space-lg); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-md);">
                        <div style="flex: 1; min-width: 250px;">
                            <div style="font-weight: 600; margin-bottom: 4px;">${escapeHtml(displayName)}</div>
                            <div style="font-size: 0.85rem; color: var(--text-secondary);">
                                UID: <code style="background: var(--bg-primary); padding: 2px 4px; border-radius: 3px; font-size: 0.75rem;">${user.uid}</code>
                            </div>
                            <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 4px;">
                                📅 Inscrit: ${createdAt} | 🔄 Dernière sync: ${lastSync} | 📊 Jours de repas: ${mealsCount}
                            </div>
                        </div>
                        <div style="display: flex; gap: var(--space-sm);">
                            <button class="btn btn-danger btn-sm" onclick="deleteUser('${user.uid}', '${escapeHtml(user.email || user.displayName || 'cet utilisateur')}')">
                                <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i> Supprimer
                            </button>
                        </div>
                    </div>
                `;
            }).join('');

            // Pagination
            const totalPages = Math.ceil(users.length / USERS_PER_PAGE);
            const paginationContainer = document.getElementById('users-pagination');
            if (totalPages > 1) {
                paginationContainer.innerHTML = `
                    <button class="btn" ${adminUsersPage === 1 ? 'disabled' : ''} onclick="adminUsersChangePage(${adminUsersPage - 1})">← Précédent</button>
                    <span style="color: var(--text-secondary);">Page ${adminUsersPage} / ${totalPages}</span>
                    <button class="btn" ${adminUsersPage === totalPages ? 'disabled' : ''} onclick="adminUsersChangePage(${adminUsersPage + 1})">Suivant →</button>
                `;
            } else {
                paginationContainer.innerHTML = '';
            }

            if (typeof lucide !== 'undefined') lucide.createIcons();
        }

        window.adminUsersChangePage = function(page) {
            adminUsersPage = page;
            renderAdminUsers(adminUsersCache);
        };

        window.deleteUser = async function(uid, identifier) {
            if (!isAdmin()) return;

            if (!confirm(`Supprimer l'utilisateur ${identifier} et toutes ses données ? Cette action est irréversible.`)) return;

            try {
                await deleteDoc(doc(db, 'users', uid));
                await logAdminAction('delete_user', { uid, identifier });
                loadAdminUsers();
                if (typeof showToast === 'function') {
                    showToast('<i data-lucide="trash-2" class="icon-inline"></i> Utilisateur supprimé');
                }
            } catch (error) {
                console.error('Erreur suppression utilisateur:', error);
                if (typeof showToast === 'function') {
                    showToast('<i data-lucide="x-circle" class="icon-inline"></i> Erreur de suppression', 'error');
                }
            }
        };

        window.migrateUsersData = async function() {
            if (!isAdmin()) return;

            const confirmMsg = `Cette opération va mettre à jour les données de tous les utilisateurs :\n\n` +
                `- Ajouter createdAt pour les utilisateurs qui n'en ont pas\n` +
                `- Convertir lastSync en Timestamp Firestore\n` +
                `- Les emails/noms seront ajoutés lors de la prochaine sync de chaque utilisateur\n\n` +
                `Continuer ?`;

            if (!confirm(confirmMsg)) return;

            try {
                if (typeof showToast === 'function') {
                    showToast('<i data-lucide="loader" class="icon-inline"></i> Migration en cours...', 'info');
                }

                const usersSnap = await getDocs(collection(db, 'users'));
                let migratedCount = 0;
                let errorCount = 0;

                for (const userDoc of usersSnap.docs) {
                    try {
                        const userData = userDoc.data();
                        const updates = {};
                        let needsUpdate = false;

                        // Add createdAt if missing (use updatedAt as fallback, or current time)
                        if (!userData.createdAt) {
                            if (userData.updatedAt) {
                                updates.createdAt = userData.updatedAt;
                            } else {
                                updates.createdAt = serverTimestamp();
                            }
                            needsUpdate = true;
                        }

                        // Convert lastSync from ISO string to Timestamp if needed
                        if (userData.lastSync && typeof userData.lastSync === 'string') {
                            try {
                                const lastSyncDate = new Date(userData.lastSync);
                                // Create a Firestore Timestamp from the date
                                updates.lastSync = Timestamp.fromDate(lastSyncDate);
                                needsUpdate = true;
                            } catch (e) {
                                console.error(`Error converting lastSync for ${userDoc.id}:`, e);
                            }
                        }

                        // Update if needed
                        if (needsUpdate) {
                            await updateDoc(doc(db, 'users', userDoc.id), updates);
                            migratedCount++;
                        }
                    } catch (error) {
                        console.error(`Error migrating user ${userDoc.id}:`, error);
                        errorCount++;
                    }
                }

                await logAdminAction('migrate_users', { migratedCount, errorCount });

                if (typeof showToast === 'function') {
                    showToast(`<i data-lucide="check-circle" class="icon-inline"></i> Migration terminée : ${migratedCount} utilisateurs mis à jour${errorCount > 0 ? `, ${errorCount} erreurs` : ''}`, 'success');
                }

                // Reload users list
                loadAdminUsers();

            } catch (error) {
                console.error('Erreur migration:', error);
                if (typeof showToast === 'function') {
                    showToast('<i data-lucide="x-circle" class="icon-inline"></i> Erreur de migration', 'error');
                }
            }
        };

        // ===== ADMIN FOODS =====
        let adminFoodsCache = [];
        let adminFoodsPage = 1;
        const FOODS_PER_PAGE = 50;

        window.loadAdminFoods = async function() {
            if (!isAdmin()) return;

            const container = document.getElementById('admin-foods-list');
            container.innerHTML = '<div style="text-align: center; color: var(--text-secondary); padding: var(--space-3xl);"><i data-lucide="loader" style="width: 32px; height: 32px;"></i><p>Chargement...</p></div>';

            try {
                const foodsSnap = await getDocs(collection(db, 'aliments_communs'));
                let foods = [];
                foodsSnap.forEach(doc => {
                    foods.push({ id: doc.id, ...doc.data() });
                });

                // Apply search filter
                const searchTerm = document.getElementById('foods-filter-search')?.value.toLowerCase() || '';
                if (searchTerm) {
                    foods = foods.filter(f => f.name && f.name.toLowerCase().includes(searchTerm));
                }

                // Apply category filter
                const categoryFilter = document.getElementById('foods-filter-category')?.value || 'all';
                if (categoryFilter !== 'all') {
                    foods = foods.filter(f => f.category === categoryFilter);
                }

                // Sort alphabetically
                foods.sort((a, b) => (a.name || '').localeCompare(b.name || ''));

                // Update stats
                document.getElementById('foods-stat-total').textContent = foods.length;
                document.getElementById('foods-stat-proteins').textContent = foods.filter(f => f.category === 'proteines').length;
                document.getElementById('foods-stat-carbs').textContent = foods.filter(f => f.category === 'feculents').length;
                document.getElementById('foods-stat-vegetables').textContent = foods.filter(f => f.category === 'legumes').length;
                document.getElementById('foods-count').textContent = foods.length;

                adminFoodsCache = foods;
                renderAdminFoods(foods);

            } catch (error) {
                console.error('Erreur chargement aliments:', error);
                container.innerHTML = '<div style="text-align: center; color: var(--accent-danger); padding: var(--space-3xl);"><p>Erreur de chargement</p></div>';
            }

            if (typeof lucide !== 'undefined') lucide.createIcons();
        };

        function renderAdminFoods(foods) {
            const container = document.getElementById('admin-foods-list');

            if (foods.length === 0) {
                container.innerHTML = '<div style="text-align: center; color: var(--text-secondary); padding: var(--space-3xl);"><p>Aucun aliment trouvé</p></div>';
                return;
            }

            // Pagination
            const start = (adminFoodsPage - 1) * FOODS_PER_PAGE;
            const end = start + FOODS_PER_PAGE;
            const paginated = foods.slice(start, end);

            container.innerHTML = paginated.map(food => {
                const categoryLabels = {
                    'proteines': 'Protéines', 'feculents': 'Féculents', 'legumes': 'Légumes',
                    'fruits': 'Fruits', 'produits-laitiers': 'Produits laitiers',
                    'matieres-grasses': 'Matières grasses', 'liquides': 'Liquides', 'autres': 'Autres'
                };

                // Validate macros
                const calculatedCals = (food.protein || 0) * 4 + (food.carbs || 0) * 4 + (food.fat || 0) * 9;
                const isValid = Math.abs(calculatedCals - (food.calories || 0)) < 15;

                return `
                    <div style="background: var(--bg-tertiary); border-radius: var(--radius-md); padding: var(--space-lg); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-md);">
                        <div style="flex: 1; min-width: 200px;">
                            <div style="font-weight: 600; margin-bottom: 4px; display: flex; align-items: center; gap: var(--space-sm);">
                                ${escapeHtml(food.name || 'Sans nom')}
                                ${!isValid ? '<span style="color: var(--accent-danger); font-size: 0.8rem;">⚠️ Macros incohérentes</span>' : ''}
                            </div>
                            <div style="font-size: 0.85rem; color: var(--text-secondary);">
                                ${categoryLabels[food.category] || food.category} • ${food.unit || '100g'}
                            </div>
                            <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 4px;">
                                📊 ${food.calories || 0} kcal | P: ${food.protein || 0}g | G: ${food.carbs || 0}g | L: ${food.fat || 0}g
                            </div>
                        </div>
                        <div style="display: flex; gap: var(--space-sm);">
                            <button class="btn btn-sm" style="background: var(--accent-ui);" onclick="editFood('${food.id}')">
                                <i data-lucide="edit" style="width: 14px; height: 14px;"></i> Modifier
                            </button>
                            <button class="btn btn-danger btn-sm" onclick="deleteFood('${food.id}', '${escapeHtml(food.name || '')}')">
                                <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i> Supprimer
                            </button>
                        </div>
                    </div>
                `;
            }).join('');

            // Pagination
            const totalPages = Math.ceil(foods.length / FOODS_PER_PAGE);
            const paginationContainer = document.getElementById('foods-pagination');
            if (totalPages > 1) {
                paginationContainer.innerHTML = `
                    <button class="btn" ${adminFoodsPage === 1 ? 'disabled' : ''} onclick="adminFoodsChangePage(${adminFoodsPage - 1})">← Précédent</button>
                    <span style="color: var(--text-secondary);">Page ${adminFoodsPage} / ${totalPages}</span>
                    <button class="btn" ${adminFoodsPage === totalPages ? 'disabled' : ''} onclick="adminFoodsChangePage(${adminFoodsPage + 1})">Suivant →</button>
                `;
            } else {
                paginationContainer.innerHTML = '';
            }

            if (typeof lucide !== 'undefined') lucide.createIcons();
        }

        window.adminFoodsChangePage = function(page) {
            adminFoodsPage = page;
            renderAdminFoods(adminFoodsCache);
        };

        window.showAddFoodModal = function() {
            if (!isAdmin()) return;
            if (typeof showToast === 'function') {
                showToast('<i data-lucide="info" class="icon-inline"></i> Fonctionnalité en développement');
            }
        };

        let currentEditingFoodId = null;

        window.editFood = async function(foodId) {
            if (!isAdmin()) return;

            let food = null;

            // Find food in cache first
            food = adminFoodsCache.find(f => f.id === foodId);

            // If not in cache, try to load from Firestore
            if (!food) {
                try {
                    const docRef = doc(db, 'aliments_communs', foodId);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        food = {
                            id: docSnap.id,
                            ...docSnap.data()
                        };
                    }
                } catch (error) {
                    console.error('Erreur chargement aliment depuis Firestore:', error);
                }
            }

            // If still not found, show error
            if (!food) {
                if (typeof showToast === 'function') {
                    showToast('<i data-lucide="x-circle" class="icon-inline"></i> Aliment introuvable', 'error');
                }
                return;
            }

            // Store current editing food ID
            currentEditingFoodId = foodId;

            // Pre-fill form (support both 'protein' and 'proteins' fields)
            document.getElementById('edit-food-name').value = food.name || '';
            document.getElementById('edit-food-category').value = food.category || 'autres';
            document.getElementById('edit-food-unit').value = food.unit || '100g';
            document.getElementById('edit-food-calories').value = food.calories || 0;
            document.getElementById('edit-food-protein').value = food.protein || food.proteins || 0;
            document.getElementById('edit-food-carbs').value = food.carbs || 0;
            document.getElementById('edit-food-fat').value = food.fat || food.fats || 0;

            // Validate on input
            const inputs = ['edit-food-calories', 'edit-food-protein', 'edit-food-carbs', 'edit-food-fat'];
            inputs.forEach(id => {
                document.getElementById(id).addEventListener('input', validateEditFoodMacros);
            });

            // Show modal
            document.getElementById('edit-food-modal').classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        window.closeEditFoodModal = function() {
            document.getElementById('edit-food-modal').classList.remove('active');
            document.body.style.overflow = '';
            currentEditingFoodId = null;

            // Clear form
            document.getElementById('edit-food-name').value = '';
            document.getElementById('edit-food-category').value = 'proteines';
            document.getElementById('edit-food-unit').value = '100g';
            document.getElementById('edit-food-calories').value = '';
            document.getElementById('edit-food-protein').value = '';
            document.getElementById('edit-food-carbs').value = '';
            document.getElementById('edit-food-fat').value = '';
            document.getElementById('edit-food-validation-warning').style.display = 'none';
        };

        function validateEditFoodMacros() {
            const calories = parseFloat(document.getElementById('edit-food-calories').value) || 0;
            const protein = parseFloat(document.getElementById('edit-food-protein').value) || 0;
            const carbs = parseFloat(document.getElementById('edit-food-carbs').value) || 0;
            const fat = parseFloat(document.getElementById('edit-food-fat').value) || 0;

            // Calories théoriques = P×4 + G×4 + L×9
            const theoreticalCals = protein * 4 + carbs * 4 + fat * 9;

            // Écart = |calories_saisies − calories_théoriques|
            const gap = Math.abs(calories - theoreticalCals);

            // Tolérance = max(20 kcal, 8% des calories saisies)
            const tolerance = Math.max(20, calories * 0.08);

            const warning = document.getElementById('edit-food-validation-warning');
            const confirmBtn = document.querySelector('#edit-food-modal .custom-popup-btn.confirm');

            if (calories > 0 && gap > tolerance) {
                // BLOCAGE: Écart > tolérance
                warning.style.display = 'block';
                warning.style.background = 'rgba(239, 68, 68, 0.15)';
                warning.style.borderLeft = '3px solid var(--accent-danger)';
                warning.innerHTML = `❌ BLOCAGE: Les macros donnent ${theoreticalCals.toFixed(0)} kcal, mais vous avez saisi ${calories} kcal<br>Différence: ${gap.toFixed(0)} kcal (max autorisé: ${tolerance.toFixed(0)} kcal)<br><strong>Correction obligatoire avant sauvegarde</strong>`;
                if (confirmBtn) {
                    confirmBtn.disabled = true;
                    confirmBtn.style.opacity = '0.5';
                    confirmBtn.style.cursor = 'not-allowed';
                }
            } else if (calories > 0 && gap > 10) {
                // WARNING: Écart > 10 kcal mais ≤ tolérance
                warning.style.display = 'block';
                warning.style.background = 'rgba(251, 191, 36, 0.15)';
                warning.style.borderLeft = '3px solid var(--accent-fat)';
                warning.innerHTML = `⚠️ Attention: Les macros donnent ${theoreticalCals.toFixed(0)} kcal, mais vous avez saisi ${calories} kcal (différence: ${gap.toFixed(0)} kcal)<br>Sauvegarde autorisée mais vérifiez vos valeurs`;
                if (confirmBtn) {
                    confirmBtn.disabled = false;
                    confirmBtn.style.opacity = '1';
                    confirmBtn.style.cursor = 'pointer';
                }
            } else {
                // OK
                warning.style.display = 'none';
                if (confirmBtn) {
                    confirmBtn.disabled = false;
                    confirmBtn.style.opacity = '1';
                    confirmBtn.style.cursor = 'pointer';
                }
            }

            return gap <= tolerance;
        }

        window.saveEditedFood = async function() {
            if (!isAdmin() || !currentEditingFoodId) return;

            const name = document.getElementById('edit-food-name').value.trim();
            const category = document.getElementById('edit-food-category').value;
            const unit = document.getElementById('edit-food-unit').value.trim();
            const calories = parseFloat(document.getElementById('edit-food-calories').value);
            const protein = parseFloat(document.getElementById('edit-food-protein').value);
            const carbs = parseFloat(document.getElementById('edit-food-carbs').value);
            const fat = parseFloat(document.getElementById('edit-food-fat').value);

            // Validation
            if (!name || !category || !unit) {
                if (typeof showToast === 'function') {
                    showToast('<i data-lucide="alert-circle" class="icon-inline"></i> Remplis tous les champs obligatoires', 'error');
                }
                return;
            }

            if (isNaN(calories) || isNaN(protein) || isNaN(carbs) || isNaN(fat)) {
                if (typeof showToast === 'function') {
                    showToast('<i data-lucide="alert-circle" class="icon-inline"></i> Les valeurs nutritionnelles doivent être des nombres', 'error');
                }
                return;
            }

            // VALIDATION STRICTE: Vérifier que les macros correspondent aux calories
            const isValid = validateEditFoodMacros();
            if (!isValid) {
                if (typeof showToast === 'function') {
                    showToast('<i data-lucide="x-circle" class="icon-inline"></i> Impossible de sauvegarder : les macros ne correspondent pas aux calories', 'error');
                }
                return;
            }

            try {
                const updatedFood = {
                    name: name,
                    category: category,
                    unit: unit,
                    calories: calories,
                    protein: protein,
                    carbs: carbs,
                    fat: fat
                };

                await setDoc(doc(db, 'aliments_communs', currentEditingFoodId), updatedFood, { merge: true });
                await logAdminAction('update_food', { foodId: currentEditingFoodId, foodName: name });

                closeEditFoodModal();
                loadAdminFoods();

                if (typeof showToast === 'function') {
                    showToast('<i data-lucide="check-circle" class="icon-inline"></i> Aliment modifié avec succès');
                }
            } catch (error) {
                console.error('Erreur modification aliment:', error);
                if (typeof showToast === 'function') {
                    showToast('<i data-lucide="x-circle" class="icon-inline"></i> Erreur lors de la modification', 'error');
                }
            }
        };

        window.deleteFood = async function(foodId, foodName) {
            if (!isAdmin()) return;

            if (!confirm(`Supprimer l'aliment "${foodName}" ? Cette action est irréversible.`)) return;

            try {
                await deleteDoc(doc(db, 'aliments_communs', foodId));
                await logAdminAction('delete_food', { foodId, foodName });
                loadAdminFoods();
                if (typeof showToast === 'function') {
                    showToast('<i data-lucide="trash-2" class="icon-inline"></i> Aliment supprimé');
                }
            } catch (error) {
                console.error('Erreur suppression aliment:', error);
                if (typeof showToast === 'function') {
                    showToast('<i data-lucide="x-circle" class="icon-inline"></i> Erreur de suppression', 'error');
                }
            }
        };

        window.exportFoodsCSV = function() {
            if (!isAdmin()) return;

            if (adminFoodsCache.length === 0) {
                if (typeof showToast === 'function') {
                    showToast('<i data-lucide="alert-circle" class="icon-inline"></i> Aucun aliment à exporter');
                }
                return;
            }

            const csv = [
                ['Nom', 'Catégorie', 'Unité', 'Calories', 'Protéines', 'Glucides', 'Lipides'].join(','),
                ...adminFoodsCache.map(f => [
                    `"${(f.name || '').replace(/"/g, '""')}"`,
                    f.category || '',
                    f.unit || '100g',
                    f.calories || 0,
                    f.protein || 0,
                    f.carbs || 0,
                    f.fat || 0
                ].join(','))
            ].join('\n');

            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `aliments_${new Date().toISOString().split('T')[0]}.csv`;
            link.click();

            if (typeof showToast === 'function') {
                showToast('<i data-lucide="download" class="icon-inline"></i> Export CSV réussi');
            }
        };

        window.importFoodsCSV = function() {
            if (!isAdmin()) return;
            if (typeof showToast === 'function') {
                showToast('<i data-lucide="info" class="icon-inline"></i> Fonctionnalité en développement');
            }
        };

        window.exportFeedbacksCSV = function() {
            if (!isAdmin()) return;

            if (adminFeedbacksCache.length === 0) {
                if (typeof showToast === 'function') {
                    showToast('<i data-lucide="alert-circle" class="icon-inline"></i> Aucun feedback à exporter');
                }
                return;
            }

            const csv = [
                ['Date', 'Type', 'Statut', 'Email', 'Description'].join(','),
                ...adminFeedbacksCache.map(f => {
                    const date = f.createdAt?.toDate ? f.createdAt.toDate().toLocaleString('fr-FR') : '';
                    return [
                        `"${date}"`,
                        f.type || '',
                        f.status || '',
                        `"${(f.userEmail || '').replace(/"/g, '""')}"`,
                        `"${(f.description || '').replace(/"/g, '""')}"`
                    ].join(',');
                })
            ].join('\n');

            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `feedbacks_${new Date().toISOString().split('T')[0]}.csv`;
            link.click();

            if (typeof showToast === 'function') {
                showToast('<i data-lucide="download" class="icon-inline"></i> Export CSV réussi');
            }
        };

        // ===== ADMIN SETTINGS =====
        window.loadAdminSettings = async function() {
            if (!isAdmin()) return;

            // Show current admin UID
            document.getElementById('current-admin-uid').textContent = ADMIN_UID;

            // Load recent admin logs
            try {
                const logsQuery = query(collection(db, 'admin_logs'), limit(20));
                const logsSnap = await getDocs(logsQuery);
                const logs = [];
                logsSnap.forEach(doc => {
                    logs.push({ id: doc.id, ...doc.data() });
                });

                logs.sort((a, b) => {
                    const dateA = a.timestamp?.toDate ? a.timestamp.toDate() : new Date(0);
                    const dateB = b.timestamp?.toDate ? b.timestamp.toDate() : new Date(0);
                    return dateB - dateA;
                });

                const container = document.getElementById('admin-logs-list');
                if (logs.length === 0) {
                    container.innerHTML = '<div style="text-align: center; color: var(--text-secondary); padding: var(--space-xl);"><p>Aucun log disponible</p></div>';
                } else {
                    container.innerHTML = logs.map(log => {
                        const date = log.timestamp?.toDate ? log.timestamp.toDate().toLocaleString('fr-FR', {
                            day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
                        }) : 'Date inconnue';
                        return `
                            <div style="background: var(--bg-tertiary); padding: var(--space-sm) var(--space-md); border-radius: var(--radius-sm); font-size: 0.85rem; display: flex; justify-content: space-between;">
                                <span><strong>${log.action}</strong> ${log.details ? '- ' + JSON.stringify(log.details) : ''}</span>
                                <span style="color: var(--text-secondary);">${date}</span>
                            </div>
                        `;
                    }).join('');
                }

            } catch (error) {
                console.error('Erreur chargement logs:', error);
            }

            if (typeof lucide !== 'undefined') lucide.createIcons();
        };

        window.addAdminUID = function() {
            if (!isAdmin()) return;
            if (typeof showToast === 'function') {
                showToast('<i data-lucide="info" class="icon-inline"></i> Fonctionnalité nécessite configuration backend');
            }
        };

        window.clearFirestoreCache = async function() {
            if (!isAdmin()) return;

            if (!confirm('Vider le cache Firestore local ? Cette action rechargera la page.')) return;

            try {
                // Clear Firestore cache is handled by Firebase internally
                // We can clear localStorage as a workaround
                if (typeof showToast === 'function') {
                    showToast('<i data-lucide="check-circle" class="icon-inline"></i> Cache vidé, rechargement...');
                }
                await logAdminAction('clear_cache', {});
                setTimeout(() => location.reload(), 1000);
            } catch (error) {
                console.error('Erreur vidage cache:', error);
            }
        };

        window.viewAdminLogs = async function() {
            if (!isAdmin()) return;
            // Scroll to logs section
            document.getElementById('admin-logs-list').scrollIntoView({ behavior: 'smooth' });
        };

        window.migrateFoodDatabaseToFirestore = async function() {
            if (!isAdmin()) return;

            if (!confirm('✅ Cette action va AJOUTER les aliments de foodDatabase (app.js) manquants dans Firestore.\n\n⚠️ Les aliments EXISTANTS dans Firestore ne seront PAS écrasés.\n\nContinuer ?')) {
                return;
            }

            try {
                if (typeof showToast === 'function') {
                    showToast('<i data-lucide="database" class="icon-inline"></i> Migration en cours...');
                }

                let addedCount = 0;
                let skippedCount = 0;
                let errorCount = 0;

                // Loop through foodDatabase from app.js
                for (const food of foodDatabase) {
                    try {
                        // Validate food data
                        if (!food.name || typeof food.calories === 'undefined') {
                            console.warn('Skipping invalid food:', food);
                            errorCount++;
                            continue;
                        }

                        // Use food name as document ID for easier updates
                        const docId = food.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                        const docRef = doc(db, 'aliments_communs', docId);

                        // CHECK IF ALREADY EXISTS
                        const docSnap = await getDoc(docRef);

                        if (docSnap.exists()) {
                            // SKIP: Ne pas écraser l'aliment existant
                            console.log('Skipping existing food:', food.name);
                            skippedCount++;
                            continue;
                        }

                        // Create document in Firestore (only if doesn't exist)
                        const foodDoc = {
                            name: food.name,
                            category: food.category || 'autres',
                            unit: food.unit || '100g',
                            calories: Number(food.calories) || 0,
                            protein: Number(food.protein) || 0,
                            carbs: Number(food.carbs) || 0,
                            fat: Number(food.fat) || 0,
                            migratedAt: serverTimestamp()
                        };

                        await setDoc(docRef, foodDoc);
                        addedCount++;
                    } catch (err) {
                        console.error('Error migrating food:', food.name, err);
                        errorCount++;
                    }
                }

                await logAdminAction('migrate_food_database', { addedCount, skippedCount, errorCount });

                if (typeof showToast === 'function') {
                    showToast(`<i data-lucide="check-circle" class="icon-inline"></i> Migration terminée ! ${addedCount} ajoutés, ${skippedCount} ignorés${errorCount > 0 ? `, ${errorCount} erreurs` : ''}`);
                }

                // Reload foods section if open
                if (typeof loadAdminFoods === 'function') {
                    loadAdminFoods();
                }

            } catch (error) {
                console.error('Erreur migration:', error);
                if (typeof showToast === 'function') {
                    showToast('<i data-lucide="x-circle" class="icon-inline"></i> Erreur lors de la migration', 'error');
                }
            }
        };

        // ===== ADMIN LOGGING =====
        async function logAdminAction(action, details = {}) {
            if (!isAdmin()) return;

            try {
                await setDoc(doc(collection(db, 'admin_logs')), {
                    action: action,
                    adminUid: auth.currentUser.uid,
                    adminEmail: auth.currentUser.email,
                    details: details,
                    timestamp: serverTimestamp()
                });
            } catch (error) {
                console.error('Erreur log admin:', error);
            }
        }

        // Load dashboard when admin tab is opened
        const originalSwitchToTab = window.switchToTab;
        if (typeof originalSwitchToTab === 'function') {
            window.switchToTab = function(tab) {
                originalSwitchToTab(tab);
                if (tab === 'admin' && isAdmin()) {
                    showAdminSection('dashboard');
                }
            };
        }

        // Event listeners for filters
        document.addEventListener('DOMContentLoaded', function() {
            // Feedbacks search filter
            const feedbackSearch = document.getElementById('admin-filter-search');
            if (feedbackSearch) {
                feedbackSearch.addEventListener('input', () => {
                    if (isAdmin()) loadAdminFeedbacks();
                });
            }

            // Feedbacks type/status filters
            const feedbackType = document.getElementById('admin-filter-type');
            const feedbackStatus = document.getElementById('admin-filter-status');
            const feedbackDate = document.getElementById('admin-filter-date');
            if (feedbackType) feedbackType.addEventListener('change', () => { if (isAdmin()) loadAdminFeedbacks(); });
            if (feedbackStatus) feedbackStatus.addEventListener('change', () => { if (isAdmin()) loadAdminFeedbacks(); });
            if (feedbackDate) feedbackDate.addEventListener('change', () => { if (isAdmin()) loadAdminFeedbacks(); });

            // Users search filter
            const usersSearch = document.getElementById('users-filter-search');
            if (usersSearch) {
                usersSearch.addEventListener('input', () => {
                    if (isAdmin()) loadAdminUsers();
                });
            }

            // Users sort filter
            const usersSort = document.getElementById('users-filter-sort');
            if (usersSort) usersSort.addEventListener('change', () => { if (isAdmin()) loadAdminUsers(); });

            // Foods search filter
            const foodsSearch = document.getElementById('foods-filter-search');
            if (foodsSearch) {
                foodsSearch.addEventListener('input', () => {
                    if (isAdmin()) loadAdminFoods();
                });
            }

            // Foods category filter
            const foodsCategory = document.getElementById('foods-filter-category');
            if (foodsCategory) foodsCategory.addEventListener('change', () => { if (isAdmin()) loadAdminFoods(); });
        });

        } // Fin du if (isValidProtocol)
    </script>

    <!-- Service Worker Registration -->
    <script>
        // Enregistrement du Service Worker pour les notifications
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', async () => {
                try {
                    const registration = await navigator.serviceWorker.register('./firebase-messaging-sw.js');
                    window.swRegistration = registration;

                    // Programmer les notifications au chargement
                    scheduleUserNotifications();
                } catch (error) {
                    console.error('SW registration failed:', error);
                }
            });
        }

        // Programmer les notifications selon les préférences utilisateur
        function scheduleUserNotifications() {
            if (!window.swRegistration || !window.swRegistration.active) {
                // Réessayer dans 1 seconde si SW pas encore actif
                setTimeout(scheduleUserNotifications, 1000);
                return;
            }

            const schedules = getNotificationSchedules();

            if (schedules.length > 0) {
                window.swRegistration.active.postMessage({
                    type: 'SCHEDULE_NOTIFICATIONS',
                    data: { schedules }
                });
            }
        }

        // Récupérer les horaires de notification depuis localStorage
        function getNotificationSchedules() {
            const savedSchedules = localStorage.getItem('notification-schedules');
            if (savedSchedules) {
                return JSON.parse(savedSchedules);
            }

            // Horaires par défaut
            return [
                { id: 'breakfast', time: '08:00', title: 'Petit-déjeuner', body: "N'oublie pas de logger ton petit-déjeuner !", enabled: false },
                { id: 'lunch', time: '12:30', title: 'Déjeuner', body: "C'est l'heure de logger ton déjeuner !", enabled: false },
                { id: 'snack', time: '16:00', title: 'Goûter', body: "Un petit goûter ? Pense à le noter !", enabled: false },
                { id: 'dinner', time: '19:30', title: 'Dîner', body: "N'oublie pas de logger ton dîner !", enabled: false }
            ];
        }

        // Sauvegarder les horaires
        function saveNotificationSchedules(schedules) {
            localStorage.setItem('notification-schedules', JSON.stringify(schedules));
            scheduleUserNotifications();

            // Sauvegarder aussi dans Firestore pour FCM
            if (typeof window.savePushSubscription === 'function') {
                window.savePushSubscription();
            }
        }

        // Tester une notification
        function testNotification() {
            if (Notification.permission !== 'granted') {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        sendTestNotification();
                    }
                });
            } else {
                sendTestNotification();
            }
        }

        function sendTestNotification() {
            if (window.swRegistration && window.swRegistration.active) {
                window.swRegistration.active.postMessage({
                    type: 'TEST_NOTIFICATION',
                    data: {
                        title: 'NutriTrack - Test',
                        body: 'Les notifications fonctionnent correctement !',
                        tag: 'test-notification'
                    }
                });
            } else {
                // Fallback sans SW
                new Notification('NutriTrack - Test', {
                    body: 'Les notifications fonctionnent correctement !',
                    icon: '/icon-192.png'
                });
            }
        }

        // Rendre les fonctions globales
        window.scheduleUserNotifications = scheduleUserNotifications;
        window.getNotificationSchedules = getNotificationSchedules;
        window.saveNotificationSchedules = saveNotificationSchedules;
        window.testNotification = testNotification;

        // ===== UI NOTIFICATIONS =====

        // Demander permission notifications
        function requestNotificationPermission() {
            if (!('Notification' in window)) {
                alert('Ton navigateur ne supporte pas les notifications');
                return;
            }

            Notification.requestPermission().then(permission => {
                updateNotificationPermissionUI();
                if (permission === 'granted') {
                    showToast('<i data-lucide="bell" class="icon-inline"></i> Notifications activées !');
                }
            });
        }
        window.requestNotificationPermission = requestNotificationPermission;

        // Mettre à jour l'UI selon le statut de permission
        function updateNotificationPermissionUI() {
            const statusEl = document.getElementById('notification-permission-status');
            const enableBtn = document.getElementById('enable-notifications-btn');

            if (!statusEl) return;

            if (!('Notification' in window)) {
                statusEl.style.background = 'rgba(239, 68, 68, 0.15)';
                statusEl.innerHTML = '<i data-lucide="alert-triangle" style="width: 18px; height: 18px; color: #ef4444;"></i><span style="color: #ef4444; font-size: 0.9rem;">Ton navigateur ne supporte pas les notifications</span>';
                if (enableBtn) enableBtn.style.display = 'none';
                return;
            }

            const permission = Notification.permission;

            if (permission === 'granted') {
                statusEl.style.background = 'rgba(5, 150, 105, 0.15)';
                statusEl.innerHTML = '<i data-lucide="check-circle" style="width: 18px; height: 18px; color: var(--accent-ui);"></i><span style="color: var(--accent-ui); font-size: 0.9rem;">Notifications activées</span>';
                if (enableBtn) enableBtn.style.display = 'none';
            } else if (permission === 'denied') {
                statusEl.style.background = 'rgba(239, 68, 68, 0.15)';
                statusEl.innerHTML = '<i data-lucide="x-circle" style="width: 18px; height: 18px; color: #ef4444;"></i><span style="color: #ef4444; font-size: 0.9rem;">Notifications bloquées - Active-les dans les paramètres du navigateur</span>';
                if (enableBtn) enableBtn.style.display = 'none';
            } else {
                statusEl.style.background = 'rgba(251, 191, 36, 0.15)';
                statusEl.innerHTML = '<i data-lucide="bell-off" style="width: 18px; height: 18px; color: #fbbf24;"></i><span style="color: #fbbf24; font-size: 0.9rem;">Notifications non activées</span>';
                if (enableBtn) enableBtn.style.display = 'flex';
            }

            if (typeof lucide !== 'undefined') lucide.createIcons();
        }

        // Icônes pour chaque repas
        const mealIcons = {
            breakfast: 'sunrise',
            lunch: 'utensils',
            snack: 'apple',
            dinner: 'moon'
        };

        const mealLabels = {
            breakfast: 'Petit-déjeuner',
            lunch: 'Déjeuner',
            snack: 'Goûter',
            dinner: 'Dîner'
        };

        // Afficher les horaires de notification
        function renderNotificationSchedules() {
            const container = document.getElementById('notification-schedules');
            if (!container) return;

            const schedules = getNotificationSchedules();

            container.innerHTML = schedules.map(schedule => `
                <div style="display: flex; align-items: center; gap: var(--space-md); padding: var(--space-md); background: var(--bg-tertiary); border-radius: var(--radius-md);">
                    <div style="display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; background: rgba(5, 150, 105, 0.15); border-radius: var(--radius-sm);">
                        <i data-lucide="${mealIcons[schedule.id]}" style="width: 18px; height: 18px; color: var(--accent-ui);"></i>
                    </div>
                    <div style="flex: 1;">
                        <div style="font-weight: 600; font-size: 0.9rem; color: var(--text-primary);">${mealLabels[schedule.id]}</div>
                    </div>
                    <input type="time" value="${schedule.time}"
                           onchange="updateScheduleTime('${schedule.id}', this.value)"
                           style="background: var(--bg-secondary); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-sm); padding: var(--space-sm) var(--space-md); color: var(--text-primary); font-size: 0.9rem;">
                    <label style="position: relative; display: inline-block; width: 44px; height: 24px; cursor: pointer;">
                        <input type="checkbox" ${schedule.enabled ? 'checked' : ''}
                               onchange="updateScheduleEnabled('${schedule.id}', this.checked)"
                               style="opacity: 0; width: 0; height: 0;">
                        <span class="switch-bg"></span>
                        <span class="switch-knob"></span>
                    </label>
                </div>
            `).join('');

            if (typeof lucide !== 'undefined') lucide.createIcons();
        }

        // Mettre à jour l'heure d'un rappel
        function updateScheduleTime(id, time) {
            const schedules = getNotificationSchedules();
            const schedule = schedules.find(s => s.id === id);
            if (schedule) {
                schedule.time = time;
                saveNotificationSchedules(schedules);
            }
        }
        window.updateScheduleTime = updateScheduleTime;

        // Activer/désactiver un rappel
        function updateScheduleEnabled(id, enabled) {
            const schedules = getNotificationSchedules();
            const schedule = schedules.find(s => s.id === id);
            if (schedule) {
                schedule.enabled = enabled;
                saveNotificationSchedules(schedules);

                // Demander permission si activation et pas encore accordée
                if (enabled && Notification.permission === 'default') {
                    requestNotificationPermission();
                }
            }
        }
        window.updateScheduleEnabled = updateScheduleEnabled;

        // Initialiser l'UI notifications au chargement
        document.addEventListener('DOMContentLoaded', () => {
            // Petit délai pour s'assurer que tout est chargé
            setTimeout(() => {
                updateNotificationPermissionUI();
                renderNotificationSchedules();
            }, 500);
        });

        // Observer les changements d'onglet pour rafraîchir l'UI
        const originalSwitchToTabNotif = window.switchToTab;
        if (typeof originalSwitchToTabNotif === 'function') {
            window.switchToTab = function(tab) {
                originalSwitchToTabNotif(tab);
                if (tab === 'settings') {
                    updateNotificationPermissionUI();
                    renderNotificationSchedules();
                }
            };
        }

        // ===== GOOGLE SIGN-IN BUTTONS =====
        // Attacher les event listeners aux boutons Google de la landing page
        document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('.google-signin-btn').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    e.preventDefault();
                    console.log('Google sign-in button clicked');

                    if (typeof window.firebaseSignIn === 'function') {
                        try {
                            await window.firebaseSignIn();
                        } catch (err) {
                            console.error('Sign-in error:', err);
                            if (typeof showToast === 'function') {
                                showToast('Erreur de connexion', 'error');
                            }
                        }
                    } else {
                        console.log('Firebase not loaded yet, waiting...');
                        if (typeof showToast === 'function') {
                            showToast('Chargement en cours...', 'info');
                        }
                        // Réessayer après un court délai
                        setTimeout(() => {
                            if (typeof window.firebaseSignIn === 'function') {
                                window.firebaseSignIn();
                            } else {
                                alert('Firebase n\'est pas encore chargé. Veuillez réessayer dans quelques secondes.');
                            }
                        }, 1500);
                    }
                });
            });
        });
    </script>

    <!-- Global Quick Add Dropdown -->
    <div id="global-quick-add-results"></div>
</body>
</html>

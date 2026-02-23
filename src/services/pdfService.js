import html2pdf from 'html2pdf.js';

export const generatePDF = (data) => {
  const element = document.createElement('div');
  element.style.padding = '20px';
  element.style.fontFamily = 'Helvetica, sans-serif';
  element.style.fontSize = '12px';
  element.style.color = '#333';

  // The template provided by the user
  element.innerHTML = `
    <div style="display: flex; align-items: flex-start; margin-bottom: 20px;">
      <div style="width: 70%;">
        <img style="width: 50px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKMAAACBCAYAAACsCAq9AAABQWVYSWZNTQAqAAAACAAGAQAABAAAAAEAAAAAAQEABAAAAAEAAAAAh2kABAAAAAEAAABqARIABAAAAAEAAAAAATIAAgAAABQAAABWiCUABAAAAAEAAADaAAAAADIwMjY6MDI6MTcgMTA6NDM6MTMAAAaQAwACAAAAFAAAALiSkQACAAAAAjAAAACQEAACAAAABwAAAMyQEQACAAAABwAAANOSkAACAAAAAjAAAACSCAAEAAAAAQAAAAAAAAAAMjAyNjowMjoxNyAxMDo0MzoxMwArMDM6MDAAKzAzOjAwAAACAAcABQAAAAMAAAD4AB0AAgAAAAsAAAEQAAAAAAAAAAcAAAABAAAAKwAAAAEAAAANAAAAATIwMjY6MDI6MTcAAAEBMgACAAAAFAAAAS0AAAAAMjAyNjowMjoxNyAxMDo0MzoxMwCyfA93AAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAACAASURBVHic7L13kFxHeif4y8xny3W1g61X8B6ER3cDJEGCBMnBcIbjpdNJoZudvZC0EdKu9iK0ul0p9mIlnbTa1Up7Oq07aWdPIc3OajSc4dAMQRIgQdjuBtAGaAPXMF0FNNC+/HOZeX9Uv4KhAVDdsDe/iC+A7qjOl6/qV9/78rPA/w8hJ+3FoydOrXrY+/gZbgV52Bt4kJDXxlr6DrSvbGtrndXR1a3PmzO7/5//6R93ktnxgYe9t58BUB72Bu43pCs3OuOjVvve/Yv/j9/+nUT67PmVnufN1lRdu3DxYn/2+rAG4LEio+u6TR0dx+LRaPzKmjVreh/2fmYKTywZ5fWJ9byne1P77/zu0s4Tx5L5oeuLayAT8xlLMMaIkS1IQkjsx3/171MydXGAWIvaHvae7wTZ19dy7N29TX/5S9+x2g4ervnaa6+1yfFxQurqeh723mYCTxwZ5ZkzTXYmv/57/+J/T46NjW8qpVLLisWiFZVS13SdECHgeR40wQhjLHl5cLDZu3p1EMAjSUbpFpsyly5bfR8fsv7k3/yJNdR3umlyYjIRj9XELw0OJibPDkgAPyPjowTZe6ap7/jxpr/9oz9N9vf3bwh7vsU5t0zPDzUYEVKrlG/VzefhFB1wIwzHd0khNWydOnDUkq7bRDSt/SHfRgVyIr9hvLOzad9v/eHS9rZ2i6SvJxml1mqqJxSljqRNIicuX13V/tH+lTKTaSI1NY/M3qvFY0/GYndv8+EDB5v+4Hf/pXXx4kBz1JPJWE0soUgwAASeD9/34QoBQggIIdA0DZRSOI5DCDWsjw8cWLL227+0GMBD/0AzZ882p4eGNvw/v/MvrKtXh5qds4NLbdu2FpoGjUajJOpTeJ4HxiQBgdXa1rr85V/6xWWPwt6ni8eSjDLrrMSBg4lj7W1r/vM/+U0rnUo3RTXTeioeTyiaYIVMHnWGSVxPQDgCUnJwSqGqKnTFhKmEkBc2hK5gttRp5vRla+CjI5acLC0icfPiQ7mnCxeaBrp7mj/4t/8x2dnZsTE66VghSqz5rjAAjUQdAWrnYBIFUUXBJPFQp+h0MHUteeW9D5Myk1lGamrOPYy9zxQeKzLKVKrpxJG2Vd/9w99Pnnr9xwlFVdeENc1qbGxMGEQhnHM4hSJxHAcsHIGu66BEgZQSjHMQQsA5BwAICJimiYwQRFVV6733P7BWPfN8AsADJaO8lmpuPdze9Cf/6veTp/tON9c7SDY0NCRYcYIyxkhIAVRVRcSVcF0Xdq4Ix3GA+TEoikKYQqx3392z8H/dvXMBgJ+R8X5Dtndu7f7o4+b/8o//WfLK5dQqz3WT6+K1luu6cd/xQFyfKIoCRVHAdANC1ZC5PgzGGHRFB6UUkhBIIQAhAQC+SkEJRY0NxIk5+9Lxnk2T+w4OADj4QO7pWG/T9WPHm3/4j343efbM2WbD8a3mWNSKKozysQJxHQ+6TkEVAsctYsSzISGhzdERCtWgLusCtouQy+uv955Zd+F4xxkAex/E3u8XHlkySjuz7MrxU4nO9z5c84d/8AdJb3isiQuxgAAWpZTatg0AhDEGABBCwHEcSF9CCIFYLAZKKRSiQAgBzjmEECC0bDcyJlEsFlEfCcNxHOK63Dp08IAlXbeZaNp9OVnLTGbppbN9iYGL59f/yW/+04Tvus3U4UlVVa2wqhMhBMmXSnBdF1HdgOd5EB4HpRSmaUJKCdtzMDY2hnlGHL7vI5vNEtM0rK7OTkuOjW0n9fVH7sfeHwQeSTKeP3Fk6Xd/47ebek6dakly7Sk3k03OM8KWaZrMkw5GxieIHtNu+Rs5FUwSCgVA4QsOCA4b5ceyJAAYIEHLr5MSimGCuRy6IJilKIn+g0efevZk72nMsJtHXri+DpcGl5340/+0bN/+D62rQ1fXPcViFoCEykEBEEWUX8sEAagOT3IwAjhqeb85xQMA2CEGgMEdKyIcDmNeNAbO+dyPf/LW5pe3bLsA4GdknFFwb1Z398lNuq6+lpvMza+vq6WFkQkUCgVSVxtHfX094OWmdQkhBBhjkFyirF05VRTFOnTooCXz+adIJHJqurchR3OrcObc+n1/9Z9XH923f/nY2NgyPaRbs2fPacBoEZhGOFZRFBQKBUidQVEUqjCZ7OzqTD5qLqp7wSNJxvrGucXGULQ0NjZWMkseDRk+dNUkvu9Dd30wn6NEgs+xrDnk1E+C3Pozv+3jlmRKBbnlg4EHAU3VoLkeFEqtE2/uWfbqi68sBTAtMl7/uzd2vfH7f9Ay9NHRjVfSV1c3miFr6ezZIRecOOMl5LXyPtSp7eh++d9AQwZQyoodYZfe8jroQLaQBVMj0BQNjVATffsPL332G19disfUzUMf9gY+DbWLlnd96bXXrmaz2auzZs1CqVQioVAIpmnCcRxM2YvTws22ZnDC5pyH01fSK863HlshbXtptWuf7mjb8q//6F83vfX221/nPn9h0aKFK2KxWLhUKpF8Pg9N0+64xr1ACAFVVdnFy5eSRw8dTsrhTNV7f5h4JMkIABue2zFYP2duSlJmG+EIJot5TBbz8DQKVyXgMKZEA4cGMSWQFJAUZEqYxC2iiLJoTAG4QIlyZLkNSgHfd4nFQlbHO3stDI0kqt27wpRYzDSsqKZZccOsUXwOJjnqYhEQ+EgNXgAnZa3tsrIUVXqLuKwsQNlGNL2yxJyyZKkDxHUwRuB5DsK+RMSX1rF3P1iCq8OLZ+6TeHB4ZMmI2Yn0czufSw0MnE8piiKLxSIIIYhEImU/2wyATD3qfd+vaMq6urqG3r6eDRe6OjdUu67VWD/UvLXpqmmGrpZKJXieR0qlEorFIjRNw+LF0+eK53nQdb3iO+WcIxqNNpw5c3bD4MmuDXJy8rEj5CNLRpKo7XrxS6+eM+tqz46X8kVuKFDjEWTgwTUVQKpTwm4ROiVMUjBJb2hCLm4R4XrQKIOnUjgMgMKgGDpM2yNqvmQd+ukHluw711LN3vV5C/t3f+vr6Ug8nB7JjguPCmi1YbiqxCgvoKhLRF2KqEsRmpJgn5wQcELg0bK4lMKlFP6UcFKWEhVwFEAQAUklmMsRIgoJ+yTR+t6HCRTdqjX7w8IjS0YAMFav6dz18kudhVIxxRiTQgiMjo5izpw5017bdV0wxkApBSEElFLouo5sNotwOJzo6OxoFiNjzVVfYNXS3kVLlvQ1NDSkhRAVzS6lRCaTmfb+gbJGl1KCUlrRjvF4fHZ3V/dGeH7Vmv1h4ZEmI6mLnGx4bcfgyNLGwaLJxBhcJGEAg8MA8QDigYLfIgQSBBJUAlQCTFAwQUGkAiIVUFGWsK7ALebQUPAw36cIZ/IITeag6QS6QQkDt374g+9ZMpWqipCkoaH9i7/4y6lhyJQdi0pfUTBeLCJGNUSgQBJRPtlPCZNl0QSHJjgUWRZKPFDigbOyeEpZkoUw5kyokFDAFANS5fCpi4Z8jiyAsH78h39oyQtDTTP9mdxPPNJkBIBFCxadXLJoSbdt2ykhhIxGoxBC3PkPpwlCkLhyZWjjlaGhTdWuEW+c07Z169a24eHr6SBTKNDE9xmJK4NXmnC272dknEmQFSvan3nx+XTRd9M+JVLqOnxFqZyOCW6VAIKURd4mgpYlOG0Hp1lHKQuRZYm6ghQGr1inDx1JyInCxqr2vmZRW/OXX0kNEzflAhKaBt0HjNudn1XAUSgchVbuK3gSKBxQOOi1ixeTbXs/Skq3+NgQ8pEnIwBs3r7tzKzG2ad938/l83moqnrfr0kpJZ7nWYcOHLSQnaz6MBBft+bM8hXLT2ez2ZyiKPA8bya3+VkgjuNYx46fWOyOXF/0IC44E3gsyIj62nTLF3alMxDpYa8kS4ZS0QS3SwA5JYE/z6O3SoBAI9pTEmjGOVxDo8v0Yt+lxdf3fLyk6r03hFIbv/JKOiO8tK1SSUsSmseqXi5AUS1L8ASoeA2mZLYapu61iWTXnv1JOTn5WBDysSAj0aO92195ub+xob4fQDaImNxPTJ20CaXUev+DDxJybKwqNw+J1vc+v/P5y1bSuux5nqD0wbzl4XCYaJpi7f1wr4Xx8cfCzfNYkBEAsGR576YXd/bkw1p6hAoZaLA74bNsxyBS45OyBJqRQoBCIFTwUMcZ5grVmjh5pvlSa3vVtpexMNG7bseOnhHfSxnhqJR0+ikBJYWipNDKfTABMAEQKUCkQFRSmJ6YXTxzefPgvkObp33BB4DHhoykPtq7ffvTA1JiQAgxMyGYz4HjOEEMmQghrCNHWi05mqnOzaPVtG/evHnQcZxB0zTlAzhNQwiBYrFIGGPW0aNHLZmpTrM/SDw2ZASA2IaVvete2tkzxL0Up5CcArbvIW+XIBmFahplO1GIikb8LAQaktOyBDZmoHFNSqEDiAAIS2m1/nRPc3Ya2jG2vaVz80vPdfSPXx8qxUzJp8ogNE2DoijgnMNxHHied1eun2C/FLd+iMH9aEIizBQo18cTwx09TQP7Dj7yp+rHioykdlZnc3NLKhQyBqWUYqrCD7FYDJqmYWJiYsauVckXlHIqX1BJdnd1JaWs0lXCSXrzps2peDyempycrGhHz/Ng2zaklDAMA6ZpVuLk00GQr2maJuFCWCdPnrRk6tF2gj9WZASA+Tu2dcxfv6Yz65TSUlOkUCioocGDQMG1wQwNrrxxwLkRiSnL7THgIEKjcUDjqEREhE4x6eQhIEAVigbCEqcOHFyLvsG11eybzKu9/NSuF9rMTSvbTqOYplPVipRS+L4PzjkYY2CMwff9O67HBAETBCqnUDmtPAmKqkBRFXClB6kAs4iOmC0SA4daN+DM2Uc6RPjYkZE0NLS//MorKUiZEkLIcDgM27aRy+UQDoehadqMR2iCfMHBS5eTrYcOJuW18eoIOX/+4ebm5gumGRr0PE8wxmAYBjRNg5QSvu/DcRyUSqVp71nKG6c7Qgi9evVqsqOtPSnzw48sIR87MgLAxl3P98xesuDUpG+PS0NFnrsocQ9mTRS248Awzcprb89jnIpQwKdlCX6v87IEyFAXMm7AMQgycBDiEiaX1sAb+9bh8vV11e593q5t3eHm1d3ZbHbUtm0QQqDrOlRVhRAiMAvuuI4qyhLcT2ArBv5Hnwk48MAKJUQlIY1SsU4fOGoVr19/ZN08jyUZYUTSz+zYkaaUpG3bloGGAYBCoQDzJjJWi8/IF4ycOXNmVb6ja6Xj5KsiZNyam96+fXsKQKpQKMhCoVAhJGMMiqIgEolMe/8352oCQCQSMS5cvLi0u+vUI5sF/liSkRjG2UXP7Tg/17LOF1zbJpoCxdBh+x7AKEquU7EVg9NxoCEDjRKcpoOfdf+m+hIABSZQUsvRGVcllXzBelta3Xv2Wr5drErDECM+sPT55ouLFi2+oKqqm8vlKulsAHC3Dv3Axg32H9iMgb/Up4BUGcJUBXV8mB6IWvITR/btTchzfY+km+exJCMAYMnCswsWLDwjpUxJKSUhBEKUu0Rks9kZucRn5AuGujq7l/u+v7zadRcnF59fsXzZ+VgslnJdVwbxas45gozwmQClFJqmVWxR0zStrs7ulvGx8Z+RcSZBErO6Nv76t8/adfGzk2Gj6BVsCNtDhAMxScGpD059ZI2y5DQgpwEOI3AYqeQLcirAqbiRBQMFEgqi0oDuUERdoFYoMCChch8OsYkaVRIf/tYfJ2RfuqoPVSPhjhX/23dSe9T8YP2s+ZJpYcSzEuaIDTWsQ4+aGAkLjIQFHAY4DFB9BtVnlQx3n3H4jKOoCRQ1AUVQKIKioaigoahAuoBwJK5qHjK1GkyNIR4Nkd2y1vrgN/9VwpXuI0fIx5aMABCur+navn1b5+TkZEpRFCmlrLhL7jOsy4ODK5DLrah2gVBdbcfT25o7xsbGUpqmSUIIQqEQXNe9K9fOnaAoSiV/UkoJznm5V0/Jtop2adOJzhNVpcXdTzzWZCSzrZPPvvqFlK3QlC194VNUPoAbtS9lCWzI4NQ5XUymh6wrh44mZDZbFSGJtahtx1deS+cYT2WoD18hUKMhwBWQDq/YsMF9VCJG5JO14J+GwGcZlDr4vl9xsJdKpUTnW+9b0nUfKUI+1mQEgJr1a7vXrl3bnc/l04wx+aDyBUGI9dOfvrOUFzJVp5etXb++b+XKVf0TExMZoPxFYozNiJ9UCFFxFQG4OcRIAGJ1nexacbW/f+W0LzSDeOzJSBoa2p/+8u6UrSsp19RQKNmQ5EZERZ0SAgECAU4lOL2LdJ87oEHRa4f6z647+fHhdfL69eoIWRNKb/rq7tQQEamcRuQYPEQ1EzoYIg5FxLmh4YNYdCXr6A7wPA+cc0gpKwVniqJAVVWoqqpHLo0sOf/m+4tl1q7a1JhpPPZkBICNLS3HVq1Z004pTT8gzQhCCAmFQom33nwzgWzWqm6NaP+a5m3nFi1adI5zXrRtG5qmzUiNzM2aMSBjoHkZY4RSarW1tln20JVHxgn+RJCRJBJHn/nyq6mMwlKeyqSr3OgoEWjIwM94tzbXnWD6PqJAY6b//MahYyerD7EtnNO34Su7+sYVkh5jgJQEUhKYPmDeZDMKKiGoBCCm5PMRkO/mw1xwkPF9H8kiraVnr67pP3x4TdV7n2E8EWQEgKXbn+7iXHQqqjr8IK7HGEMmkyGxWI11rL2t6nxBUld3smVbS4pzPiilFEEfyelCUZRb6sKFEJVDjOu6kFISz/et3p5TVZfjzjSeGDJibm1q9y///ODAxLUU6qNy0i5AaAy+54FRChUU3HahKBSeN/3cXN8tYc6sevD0tcTZ/Yeb0m2dVX+g0aWLu1e88MzJXI2R9gjg3VTTEiDQ6LfX+nwWpJSQUlYe1wAqdqOmaWjgwALdtI6+s7f56oetj0Rq2RNDRhKPD6xYubx/2bLl/WOjY9lYLCaDajzOOVRVBSEEnufNSHVhEJkxTZMIKaxTp7oTcnS0qg9Vq2lo2/3FLwyqChuUUt7/onCUo0u+z0lNTSzZdqz9kShpfWLICADzNmwYWLFz+/lBXkh5IR2OocKTArbvQVUoFEYgXA+GMn0ycuJBUB+NTEPE5da5D480o+dc1dpRf7apbX7zhrYr+UyKxKOVnjpBdlEQe1aFhCqm7w3grg0GQWoJTZxta18/dKJ7/bQXnSaeKDKS+vq+ppamC40NDRey2awjhICu65UejEFq1kycVm+enMAYo6lUKtnR2pqUxUxVGoaEQm1feu21VLFYSum6Pn223QHBydrzPJrP55Pvv/deUuary0SasT09zIvfD4TXLO9d+PTW3iulbHoMrtQiIQiFwinZYIRCJwRw3Wlfx1eBgnBACyXECEOdT6z+/UcWutfGFla7ZrJ5c7u1duWxwcnxKx4DvKm4tMPK3cYEERW/6XRBozry0kGIS1JDlcS5D4+swuDIQx17/MSRkcxf2Pnss88M1tbVDrquK4KipyDeyxi76zStz0OwDueVaQR04MKFZF9PT1JOlBZUtfdQ7OjXvva1VD6XT+FGJ+j7Ak3TYNt2UHMTGh8fX9a7/6NlcnT0oUVlnjgyAsCiDWs6VjVt6igxkc45JTBTr6SBUSHBZuBj9lUCTwEMqoB4HLrNoZd8q/Wj/RaGr1blBAeA+Tt3dCVXL+vyKEY8CvisLEHk5fZTdrXICRvcoGBcQJUgdR612t/Za2Hw4RX8P5FkDFkr2teufWoQlAwWi0UR+Nwqs2BmyGYMejpyzmHbNgzDmNPddWrL+NjIlqoXbmwYbGluHoSU91U7lkolhEIhFIvFwNMQP3/u3Jqha9eqqu+ZCTyRZASAlV947Zi1vqU9yiNpd9hBg1kDkXMwoXPkwjMQgsn6iCEEh0rkuQt4BSjSIWsV1Xrv//4LS45dq84JPjs+YH3nm+fPaBg4rUpb91TUaXGEfQKSLWHUsDERnn7I0zE1jAsPc6QOdTSP5UqUJH3V+uvv/qeEvJZ5KLmOTywZybJE68b161Mlu5TSNE3m83nU1taCEDJj+YJBahalFKFQCLquo1AoJIbSQ00jAwNV++3mzJp1fsdzz58Ph8JpKaW0bRtBaetM1FQHCJ4Swb0AsCYns83XTxx7KD7HJ5aMALDy6aazqjX7zFVZytngoCEdEaaB2NPXLFRV4EtRaU4fNUMwVQ08WySjg1cS3QeOJmSmSjePFun60iuvpMOGniYQsEsFMEKhUAYFZEZs3rCg0BwOzgikyuDAg1BBvNEJ69A7eyxZLD7wEOETTcbahYnUs889m8pmsynDMGSxWISiKDNiMwbhttvzBadCcFb7sWMr+cBA1elZ6vz5I57rjgQHLwCYqbg1gEppbJBmFkSpOOdWV3fX2qtnzz7wBIonmoykrq7nqVd3DnqJeCpPuJjwbbCiixo6/aFALheQlIEqDFwK8JID6XioJRqsaB2dOH8pefZwW1La1eULehcvxp1MNq5SCo0xCM7hex6IX+5TPl3EuYaYpyAvPBSkD5v4gKmgkSgEIxNW17vvWTKXe6CEfKLJCABsyeKelq0tpwr5QkpRlJu7i00LQeMmxhikLM+C9jwPiqIgGo0S33Ot1vb25Xz0+rJ7XVuOj6/9eP/+hG3bCcZYxU8a5Cbe3C2iWgS9eIKcxyC7R9M0oipq4sDBQwtwdbgqf2m1eOLJSBZb7WtffDrNNZp2qZQhRQPc6R9ggscyAQMBq/Ty0Vwfiu0ioYRrr3f1PtX74eGnZCZzT4QcP3060Xn0sGUQkSAQYLRMHk3ToCkqJJ/+o5oWHEShVOqria6gxF2ECjYaCYux9Miqs2+/90Ad4E88GQFgwYIF+Vg0lg86ls3E7MEgaTXQKoEt6nkeisUiwuEwGR+fsDq7Oi0Iek+O5DO9/SuvpNMrdN2IopxUfoOMM9RLyHGcG8VrU4PjXdet/N40TWv//o+tsSvnt0/7YneJJ56M8urVVR99+OH868PX53POwaWEPwMfZpBJLiAhIMs9HhUKjTBohIHmbCybNb++7Z33nyodOfbUXe/3WOfTb//N3yxMNjZazHEACDhOCYIAvhSYzOZQ3zhr2vtXNB1cApIScEg4bgmUAXFNg+p5RM3k5k6ev7jlakdP9Q78e8QTT0ZMTs7vOH48YRhGIh6Pk2w2C13X7/tlp9rckUg0arW1t1p3ky8oS6UFp060NZdKpWZKaSIcDpOgd5DneTBNE7ZtY2xs7L7vXwhBwuGQdfjQYUsOPZi+jk88Gc/sObB07OTZJRGmxuKaibz04OvTdxxX+jxO1WEHUxSCDhXU8wHHxVzdTJx4f98Ku+/snU/Vw8OJEz/daxm5kqVLTkwi4RMOqQBazIRDfFDdQNGbvs1rKxS2QiuZ48FMRRAfID5CAAkBiXP7jjSVuk//jIzTRWH4ysY3fvITS9V0i/ucOI4DwzAeyCyWoDUyY4xeSV9JHjp4OHmngv+eQ0c29/f3bzFNc64QArZtV7pMRKNRjI2NIRKJoKam5r7vX9d12LZNJzPZ5L69HyWl6953Qj7RZLzy8Ykmu+di01JELIMTInIleDpDkc5AwRMnUDiZmo1AK/NkAtF1FYAALZRIvW5Y7Xv2WRiZ+MyDjBzNNB/88buWVrKteZEIIdwjhHsQVIATjslSAUXuIc9dkND0zYysXpZAw6tCQBUCPiuLoTAI1yGLaci6fKB1OT9zuepGV3eLJ5aMsmdg69tvvbOkvr5+Cefc0DSNBNpmJuO7n4XgpOo4DuLxeO3AwPm1Q12nPvsgc6p3Q29fz8ZwJGwpikKCHt+FQgGKoiCTyWDt2rXgnCOfz9/3/QdNS0OhEJ2cnEzu2/uRJYfvzUV1r3hiydj37kfNw139TfNgWvGihAEGTRCUqJgRmzHoixggmEEY1KwEPRcZl6C+IGEJq+2DDxLy7NlPxHxlenjDu3//I0v3hRVVVOJlc2BSQGcUgkjYnoO6ebPzX/+lX8gtWbEilykUpq3aS0pZbnT2FVCEgE9lWXwXlAL1nJJaD9bJjw5ZuDByX3Mdn0gyymKx6dChQ0kQuiCTybBQKESCuK6qqjMSwbgTbvbj5fN5xOO1ic6u7pbs5OQn0rO446/Zv3//mrq6OgsAstlsJbvINE0UCoXM6pWrerHjufe2bNl6RJZzHe9rFWEQt55qHlWfTqXXXR+8cF9rZJ5IMvb81d+0jB5v27ZCY1ZhvkbOkVFkoxqchijmjFHMHiXI5xwIzmArCgqEYJi4GFM4CjqHF2UAfAA+VC6gclHxK/qEwScMLuNwGa/YWmGXIuxSKLwsDhEoCg+aoSAWj2CW51N9dMw6/O/+gyUv3sh1lGO5NT/5y/+4tL5gL11AmEHH8mSeGoFNNJBQDYbr6+XYrFmp1b/+a0ehK39v/cr/8ubl1cs6fOoPF7wCQooC6vvQbY4Ip6AFHzXUBCQDJINLyxJUGwadfGMuR8zlNyaISQNSGtA9E7pnQlAdJQ+4Rgrgs0JQ7RHrpz/4r5a8ePG+5To+cWSUHf3P7XnnnWWGYSQ9z6NBPLdUKlV6Fuq6jh07dtwSPVEUpRL/nYl8x6AlnRCiUrsthLAmJiea0d1942SaTq/r7OpeFwqZVrFYRGNjIwqFAnzfh+u6GB8fn1y1enVPQ0PjITKr/geIxPa8sOuFoyW7lNJ1vaIdDcOopLPNRIQp6Bc51YGC6LpuTYyNt4yfOHHfUsueKDJKe3Lxqfffbx44fbolZJiW8DnRHSDks4o7Z1QVCC1JyC0/95rkiQaZl570NIowUaB6AoYnodo3yBjYgEEXsLutQQmaxUsu4DkuwAUYCMaGR62TH+9fIu3Cq1760gs9H+1vmRwcXB3VwzFe8oiia/AEh9QVZJyi9BSWenrXC72YVd8LAMQgF17YvfssjUbOFCkKNhHwFAKiKnC4D1XXUHJsBDumsiw3UJ6pVZmjiFtrGwLNqUiCsGZA2C6koZ1Q6wAAIABJREFU4yGqGWRyeNQ6sGevJVPX7gshnygyjl66svatt958as7sWVaQwRxU72mahmKxCNd15ZYtWzjWrvU2bdrk27YtA40Y1FXP1NTWIBdRCBFoZFIsFq3Ojs4WlOxvFvPFb320/6NttTV1FgBCKUUmk4FhGAiFQigUCunVa9a0rWhubiO6fjpYd96ceQMbN20cKBQKKc/zJKW0cmCaykmcsb0HtT4AwDlPnDx5shl9fT8j4+dBDl5bu+cv/nJjfmR8Y1wPz+KuR3RFheEDhg+YoTAKxZLMz4ml5r38zFE06j9c8NrOI34sNDhBuGC2QI0SQsRjCLsUBADBDb9hpaPDVN3ynfokCp8DQgJCQGUMmqLC1A1oTKGj14eTF9796OnRjr4Xh3vOr5jNzBBKLkJEQckTYHoIBUplASS1ddfOPrJ48Qc3r02ies/Tu7+YLupaKkeIdHQd46UipKFDEgKqKJX9B3LH92/qfiqaEQR2voAI0xBhGrSSjwY1RJEpWife22dJOfNO8CeGjOlj7c0ffLB3W01NzBobG6s0PAq+1YQQUELS6zesb8WSJT9E0fn7+avW/HDt2rVHFUVJua4rg65dM9ET/Oas7KDPD1CObEgp57z55ptLDx48uBRAbGJiggRayDRNcM6Ry+ZyyQXJ0xvWbzz9aeurmzaeWr1qzSlKaYoQIj3PA6W0kt0zE3AcpzKfJjjZm6aZaG1tWz54/uKMNxl9Isgoz1x+8ePvfm/rXFuuikgSNTxOdKbAKRRhUg0KJxgtFaRaF0+t+carR8mchj8ns2e/QRoa/qL51VePor5uUPqCS19A5ww6ZzfmUQc2IxGQREATEtpNvW5un95KK0IAIUEkoDIFwvfh2jY0yhDSdOR6zpHr7d3EMqIIFVwokkKR5XhxkUKOU5He/tqrKT05J/Vp90wWWW3bv/GVlB8LD+ZUKhEykBc+HO6AahRBH8dg/nRlPvfdtr4VcqoDB4N0PJiCQnE46hWTZtNDyc73PrDk8PCMOsEfezLK0ezKD9/4YUt//+mWxsaGBOecNDQ0QFVVFIvFSrQlm82ma+I1rau2bWu9+e8Xbd3aGo1GWyUXac/zJDBzvXiCfyml8DwPpVKpYpsahoF8Po9QKIR4PH6LT5JSmtZU9WjT8ztaSbR8cPk0LNvxzHHD0E4IIYZCoZD0PK9SrThdSCkrE8KCDHbXdUEpJVLIREdnZ8IvVjeY6bPw2JOxsG9v87v/799sS4QjVh0YzQ8PgzkOOOcIhUJwFIpJz5FONJT66j/4ToqEam4hI0nOPfb8z3095YdCg3kQWfA8QNPubBPeYZ61yhiIlFAog2s7UAlDPBIDdzwI10cdB+o4wBwXMUXFeCEHl0jkFSqHPSf1pW//cg/ZvHnP5907mT//yPavfiU1ImWqxCQclUANGSi4NqgUZcGUppYEVBJU9HagKW+7n8pUhamDn1uyoVJWni5GKNx8EQ2xeN1I56mnOt/aM6NO8MeajLnTXTv/x9/9oDkUCq31fb/W9300NjbecgrknEMCEwkrcapu4YJTn7bOssWLO5KW1VEoFIZmonfj3WAqGxye56FQKGD27NkYHx9HbW2tY+jawMplqwbuZp2VK1b3zprd2Ou47gRjTBJCZkSz3wFEVRWrp+dkQl6bua63jy0Z5cjI8hPf//G23tbWllpVsTSVEM8tIkwZVJ9X6ppHFB8Tukiv3LUjjWXz0p+2Vu3ChemnXtmZvk69dCGkyAlFVCIWgV8xmJbg07J8FgKNc/vMwtuFODZ0KUAIYNslcF2DqzA5wUh67tqn0vOanvrUvd6O2JrVl1c98/SlCc9J85AB27NBVVrZb2Az3njjyrZwZbYibj1tB/mZFZnqmHubP5LMdYQ1fKx7w/Xuvhnr6/jYknHwnXda3nv//W0NDQ1JANQ0Tfi+j0wmU6lHmeqBI+Lx2sGXXtw1SBobz3zaWqS29vLaXS+cbZw9+6xt24WZnlf9adA0rRIVYoxhbGwM8Xhc5nK5wV27XhgktbM672YdMq/h9HPPPT8YDocGhRDCcZwHkpUkpSR2qWTtff99S05MzAghH0syjp449bUT3/vRF+LXMutqI2addEsoSRe+IiE8F+A+XM+Doqq4LEuppc9vP81WLf5UIlawwrq0YffOiymeT02YkIFGCCZVBdV/gd9RklvlsxBooNtFNVT40odNPEiDYlK6mISbql26oGPurufuiogB6leuPL2hqbl/olRKEYVJXwYTEcQnpssGCDR0gEDzBfcdeBFul0BjNhZdspAo1ulDR9fh81Lj7gGPHRlL51LPff/7P3jh/MD5lnnz5iWuX79OOOfI5XJQVRXxeLxS5WaapojHa1Iv7tqZIlqo7fPWJZHIqd1f/OKFeE3tBQDT70B/F9B1HaVSCZRSRCIRWcjl01/YvTtNrDmfu9fbQWpC7S+//Mpg2DQHdV0XMxFbv+M1CYGqqmY2m1128MN9y2Q+P21CPlZklKnhZe/94Mct3YfbtjVwxQoXXAoIKAqFTXz4KqCrKiTn8IQHl7vptc9tb1NXL7urD9dYsfTUmh0tJyfA01PjWCo2Y6Bh7mQzBrh9KsHttqQrPQgm4UIAmgKbSTlnycL05md33JWteDvM9Wvan9q0sZ1znsZN5t0nIzC3nqZv32dwqg405O02ZKAhI56AXnRIXNGt/uMd1uX+U9N28zxWZPz4o/0t7/z0ne3hSHhBNBZlly5dQjKZhKqqME0TUkqUSiVMnShlsVhMPfvMMyliWXdFRhKPd7S0tKRc1x3Efe4cK6WEbdtQVRWapmFyclJu3bpFoq6uquuSxVb75i1bBguF/KCiKPc9YVNKCc/zYBhGeHIis7y759S0yxIeGzLK//HB1/u/+/0vbruY3bDl3Hj9qMNJTWIh3FEHaknBHB5FTV5BpuiA6iFcnR0ZZltWdeovb7sn+2vO+o2nNjVt78lP5K8Tn8iixjDqOyD1UYzDheZzROgnDwi325Cf0CjsVnE0gawswdQ1lAp5zFVjSHWdAbhS9XtU/80vtOPpLW3HdZny9Ro56TGEHQUNNAqNSCiSoxByMM6ylVqXoJoRpCyKLIsmyqLzTxfURTBJfdRM2iQ8VrAu/mSfJS9OL5vnsSBj9tSpL/237/7X1yYnJ1vyhYIVDodJkJ0STH7yfR+qqsIwDEgpJec8/dzzz6dDRuzeHnuxuvTmLZtTmq6mOOcSAOLxeCWbJrjWTCAcDld69GiaRsbGxhLZE8eqftzV1DS0tTS1pChhKSGE1HUdqqoiiMwE8fqZqBsPckE1TQMlJJHJ5ZuHWo882WSUfQOv/v0f/dnXr6cGt+XHRpOk0STjtAhV1+BxH4onQB0fwvVgqhq8kI5J4Y/EEvM61rzyUkecGBfu5Xpkbu2ldS8+ezKyZGH3VWGPqaouFUWDavvQHA5GKPgM1C0rIIiaIfi2A+n50FVGJ8fHrA/e/cCSQ9UPCHrmpZd7G+bM7s17zqTUFFBdhc09SJ+XbUPfQ0ibvmPfhYBQKAymQgUlcixrHXzrPUtmMlUT8pEmo3fu3HP//d/96QvnBga2KwpLzpkzh5qmWbELgzhs0IsGKI+29Xw31bK9ZQA1NfdExApmzbqw/eltF4QQKUII8vk8wuEw8vn8jHWjCDJsglh1uebET5zs7m5CX2/16VlzG9Nbm5pSjuemPM+Twci2ICI1U7HrYJ2pbmaEc251d3Vv7Dl1quqB6o8sGWXXmaZ3//wvd/e/8e5zq4ixpNFUDVrMwgsLuCEOW3hwwRElKiJQQKkC1/VxBR73Z9cPbnhpZ4rE43cVUrsdpKbm/JJXnutRVy8+lSkUJoquixBXYHgU8CRMxZj2/akc8HJFGFRBRDPgF4uoMU3qTk4kD3/wflIW3K1V7T0WO/P0zl0ptbYuNe77Iis8uBoDVRUwTa08SaYLWwgIRQEvOdAJw2yuEGMin+x5b68l8/mqpsw+kmS81tvb/P7f/O0LRw4f2T5//vwFQ0NDCgDYto1MJoNIJFIJ5E9Vr1WyShhj6Q3rNwzMXrrw/HT2EFq8+Nzzzz93znGclKqqslgsoqamBqVSaUZmDwLlctag/sbzPIRCIaIbeqL16NFV2csXqx4QNGvNmtMbNm7oZ4ylPM+TwXsU5GvOREeNIFc0yJLXdZ2YhpnoONG52j13YXU1az5yZMzsOdB07Ps/+sLRN9760qJwbIPm+/VhQjA6lEZy7iwUJ8ehCB8SHIpKoUgCeBy+wlCSQniz61KbvvxKioQa2qezD9LYeGbl7hcHo3PnDpYYE/AlQpo5YwVbig+YRIVCGYTPQYUA4RwxRWHjV68kO/Z+lKx2QBCpCbVv/9LuFGusS+UYpG2o8AQHh4RJCJQZ2L9PAaFQKJSCex5iro9Gwgx9aGzJqTc/WCJzuXv+Mj1SZLx8/Pgze/a8vftHP3p9V7y2duXY2FikUCiQSCSCOXPmYGRkBCtWrMDw8PAtXfp93y93dAXSNTWxtrkbN99TBOOzkFy6/MyCZPJ0sVBMGYYhfd+HpmlwnOkHaIJ8wcBfxxiD67oghBDBhdXV1Wkh41R9so5s3NJeWxtvA5AihFTqfGYqbh3Y6qqqBh3XAIAwyqyjR45YPnfvee+PDBnl3iNfOPoXf/2N029/+MVVNLKOuk5dRGGE1BjIUw+FUh5MpfCujWGuFgYjFMV8ATnhwlGAEXA5wUjqte/8corMaZgRMhIt1L7z576RcmvCqdFSQRYg4AkJRZ++zShEWQL3lK4qkNwHLRYxJxKJnz50dM3ggYNV99QmVk3bt37tV1PXhZe6VMjKyOx6XMtNIBYJo1SYfnsUhargngAUBi1kApyDAYjm7ZrSwODqY2/99J4f1Y8EGQ/9t+99/V/+89/9xoEDH79UE4utMk0zijvUEXmeh3A4HHRZxfj4eHrTpg1tsxvvLa57J8QWL2pfvnJFm+/zlBBCxmKxGfMzfg6IpmlWR8eJablKZlvzu5YsXtLJKB22bRuRSAS5XA6hUGjaG7x52sPNEx8opYQxZrUePWrJ1L3lOj5UMsqzZ5sP/s7v/eN3/vzPvxUfndi1PlyzysjkotpEhgR5eEEsOOj2pQgCRZQno8YMAxlNIqNJORJiqbWv7krN2by59c5XvnuQ9cvbtnx5d2pUF6kxk0poChw5/VLQ4H4EFRA3RUA0waEJjjrQRN+R1ubsiZ7qHcmL56U37n4hlTVYKiNc6RkKHM+FMgN+RtUnUH0Cm8mpTCYBRxGI+AIRLhKD+1ub88dOPvpklLa9dOC9n/7i7/+fv/fNn7z15rci0ej22trapKIoNDgp3w2Cbg0Tk5OpdevXHU0+tWFGiRhg445n++fOTfT5vp+5ua7mfoJSSjOTGev99963ZKY6JzgxjAtbnn3mbP2shjOe5+Udx6lEZKaLz9GMoJSSYrFovf3W25aUdz/c6IGSUWaKTSN7Pvyf3/7jP/vW9//pb33L6O77Vn2xsD08MW6FDEILuVFcHRpEQ2O8EgMNeRQh70bNXUHVUFA1RCiDn83hOnXlMHXTW76+O03WL7svZMS8ePqpr7yYTileOuc4UijVx48DfCKTOqg+nOogWyOARkW1Th48sh5nLlSfvLogObBuxzMXMtxJ2QokM1QU3NK096/7gOZJFFlZ8ipHQRNQpYQGkCV6zBo8cmLjREf/Xfscp/+u3gFydHRrbmw40X+kI/F//bPfsoYGLi/zPDc51zCtbCbTUGuU48xDQ0PQdR3z5s3D8PBw2Sj+HKiqinw+DxaNpJcuW9q6rXnb/SEiAEL0ftnRff79994/r9jZpUII835/i6fmBNILIyPJ1j17kjLvrCMR/eS9rkPqoj3ZYx1NZ978yaAQYgW4z2aiC9vNdTaBdrz5d6FQiBTyheTrb7yRlBMTG0htbded1qyajPL6+DoQzAdVdIATcE5QKhHkS4DrEXdkDN0nu+Z9/9d+a/7w8EhCL/kWdT3LKjiW7/t0RY1OEJmFK24OolAAbYigVCrBLoyhfk49MFF2nyi8/LHntfK/2aloXK0HKCCSxMKpHV/+YoosWnTfyAgAWL6kf/XOZ/oyP9q7xvO8ZYq8q0YNn4mgsjDIEidT4cwg+9oAgy8kQqCJE4ePJlZ8+YsWgHsmIwBEly/p2bStZeWHH+5bOVc1FjBNnXbFlirLporHyiZV+cEvUSPLxXBRVxBVkMTZo8dX5E/1rQQw82R8/fXXt+7fv2/D3/7+71mE0PmSMV1wTot2kWSzWZKdnEShWMLY5Suor2uYP8+IzPd9P+EXPEYIIRFVJYwxFItZOI4DGWLQdR3ZqQ5amqmhUCggfIetSSmhKkoqHAkd3fDss/eXiABIJNJ1cd++jXt+/OEAgCSA6ft37gApJVRVDY0Mjyzv6T1ZdcE8qalpz/zgB00/ev31Qd1aYLmuyzDNM9jtk7pu/J8E8xNRLBYNz4ss7TjRscS27RWGYXxu6cc9kbHQ0771r37uV1vmu/aXsixsAUhIQCdlg45EygIAWBWtAzxB4GXLOwyeawSgFBhkMcAEYq4P3wUavPK746g+AIKJUFn1+1p5aLmSc6AoCuaUdPi+j56lC+W58+dTv/vt30iT9evvOxkBYGHLC12lTW8u7e3tW7oxl11qGAbJjYxC0zTUhMpD0KGxcks7o3xi9Wj5Ldb8qX95WaNEnLImzE91IslNHXBDU2eLaM6DwjnmwSeKB+vI331vsezufpasX3+wmr3Htm1r3/xz31xw9fUDC2Kx2iR1JwkAOGo5ROiqNwZxAijH4QFofOr3U+t4U2c3AQcgQGTKy1ViytT9lF+ge0A8VkvULLP6vv+u1fziixaAzyXjPZk+e/d+1Myl+LppmDsppSsopRFGqUYpVSiljN6EqbXvtu/QJ6CqKhzHQaFQqMxzDmKsoVAIIyMj6eatW9ssa+EDISIAkDDpfOGFXecZo+cJIfZUxKSyt1KpBNu2K93Mpn298iw/EEIShVyu5czx4y1STi6qai3Lat+0eXNKUZSU4zgyFApVuvgGuY6BzTdT1ZFCCHDBax3XXnv8xPG1d3r9XZNRnjnTdOLtD5LC9RZGDFNhjFHGGAmaYt4ud4LGyxKcJoOqu6DGQvEEDEmhuQKs5EFVdRhGCI5KkZM+LzB++bnXXrlc07L6gZERANbv3tk5f8WSjrzvp2wppRoyAJXBcX1wUe7cQMRNNdJTVYU3qvTK/tPb+yLeXj1IZLlfj6lqUAklXqZgHXz3fQu56luKrH+m5WR4UeLkMNwxpmggVLlR3+1LMF9C4RTMJ5V9SCIhifxEB43AG1Cpw0agfSQIZDl3kgsQjxPqcat1777Enfo63jUZ2/fsab42fL2ZUmo9gI4FcBwHoVCoMreFcx5kt8jJycnU+g0bj25sbn6gRAQAUhvpevH5nSnJeYpSKgzDqGhwXdcr2eDTRfC4DOLJUsrZ/afPbLrU3bOp2jWVxrr009taUrpupHK5nAiy46e0b2X29Ez4UQOfY9nu1RL9/f1Ng8ePf66/9K7IWDze3Xzi9XeTCa4vqA1HqVcokdudnp/mBP08BH7E4BtW0MriUQqPUug+RRgaYrIsIBT5QhFXpZO3a8OnX/jqF0+TxXOnlZlTLTbvev5MrWWdthkZK3IJW5KyVmTlLByVKaCCggpamYoQaJpAY1Y0yxRurx4M3kPheFBBUccMohU96/g7ey2ZGa0qKkOMmvOrv/5yr7lmQe9wZjJT9H3oig5TM6FBAfEkVF8iRG70d7zRg6esIYMK6xv+0bIET4DK9ARIGAqDLiQiTCFG3rWOvbvPksXMZxLyrsh48PCBpnQ63aTreiIUChHHcT6XiDPhx9I0Da7rwnVdmKYJVVWRyWSkoqqpbdu3tW1saXkoRAQAo7Yh/cwz29Oqqqby+bwMqhN934dt2zCM6R+0g545lUQKXUc0Gk2cOH68yes7U30m+KLkuY2bNp+lpNzXEcAtEZSZ7NUT2PhSShKNRKzu7q516Y6uz6yvviMZ5Z4jTQMftlrzfDXZUAS1cyUYbPqp90EH2OCbF8wlqdiMgoJ4EnAEFE5RoBS2qqZr1ixvffrnv9lK6qI9095ElSAGOb96166B8Ly5FwpU2rZKITUNPmPwHB/cE5+iEQXYTT1vOJXg9IamUUVZKKZEpZBUglECz3UQ8iXqFJ0iPZo8/sae5OdpmM/deyx2evHz21I1ixIpEQ+Lou8ha5fAXI4QUaBLCnJTJjgnApwIiCmZiqjDpxT+TeULt9vIkotyj0fhwc5NYo6iUS2bS/a/92FSnj//qYeZO5Kxr/9kc/pKqtkMhRIAyOjoKEzTvOVb9GkyXQQ9qimlKJVKcBxHmKHQ5eXLlncbO7d/bqu4B4IVS87Nmj37rGEYKc/zJOe80s+wUChMe/lAq9xc3VfO2ZSJI4cPLeDcX1Dt2gsXLumfN29eXzgcTjmOI4vFIoQQlR5FM2XzBjU+hUIBjDFimqHEqZOnFiJfWvhpf/O5ZJSjQ00//i9/nazzkFRtzmqojnisFnZx+smlAhwCHFIKSCmm+l9LSEEgBQEnFKOTGYTmzILeWC8v2dnBuRtWtX7hn/zaAz+0fBrIrNquXb/8P10oqOoFPxJ2pjLNQZgCRdNvnFKnNMUNlDVhEIuu9FGckqBHTsErwSMcPuEwoiaY50MUS5ilGFSOZ5OHf/Jusuq9NzS0f+U3/lGqd2QoJUOm9HUNmqbDdT0YigqdKZV9BPXVwX6Z9MGkX3mCVXqA39atDSqFzV0olKK+thYxSeCOjEXyfQPLL7/9/nJZkp/4Mn0uGQ989PFGhZGNru9Zgf0SfGPvN1RVRV1dHa5du4Z0Op2aP29u6z/4lV87ShqmV04wk4jW1Hdu39bcOTExkaaUymAC10y9P58e4QABkPj4wIGEvHRpe9WL18bat21vactmMqlIJFKJLc9UVlJQIxPUyfi+j3A4TAihVs+pfsvPfnKo52eSUfae3dD1g7esMIellzxKNYX4EABhZZkmAr9iYFOZflmCb1hBA3jMQCam8yvUH2z65pePkmc2/2jaF55BkDXLOp/96muprEoHc5xLhzFAUSGZgor194lOE+UODoEODPxzgc0V2NDB++MxwKWy/BpCEOIEIU7mDR06tnXwYHtVFYQAQNavadv01d3pDEO6ZKpSMgWCMhSLxXKT1Zv77RBU8i0DDR5Yj8Ed3P4E8Ke0OlEJfPgQpRJqDAO1ksy90HF8y6m9BzbfvqfPJGPPwcMtZ86ebQFgKYoCVVUr3RseFArlgY2DL76488iLL730SDyeb0fNpo2da1au6ZyYmEgH9tZMPjk+zTNRzqZWrJ/+9F1LusWqx6ctfmr96WVLl/RnMpmsqqqVupaZ8IYwxip+y6Byc6ruh2YmstZH+/d/olnBp5JR9p5t7vnhu0sWlNhSRQgjrKrENRmKqkTRd+HPQP5UUZUoqrKiEaJuWYJTaFaFvJgdS+XnxI7u/vV/2EoWL35kHs83g9TXtLa8+lLapkj7mipzjgPOWEXD3ejqJaakrGmCUykTZQk0TmCbuawsNuWwKYcPDk4EFCmhSIkVatwabe9ruX50GuPTZtemNr+yMz3iF9NSZdKngGGG4Pn8E5o8sCGDU3/l/m/3j07tX+oUNjw4xAcxFYD7cIoF1KgKZsci1pXjPc1jR9pv2fun0ur08Y6mM6dPN0ej0UTQWbXihL1ptsp9hCyVSulQyDz6C7/wCz8Kbd784/t9wemgeXtL7/IVy3sJIZMz+eS4OQpzuy9QCEEoIdZP3nzDkpm7z6a+GUSP9jW1bD9vWdZ53/dtznnFXzpd3NzBIvCKBJNma2pqSL5QTB46eCApR2+4qD7BKvne0ebj73yQbOTMqin6VNd14nkeCvBRogJMU0HV6ScCBPOZA1vD8MoyZTOOq/FI9ytf/9q7Ld/+9uvTvtj9RkNDaufLLw3akqegMCko+URH2+BnQcsS4PZJVoEmDU6rDpVwqLwxwWqKjLESxyypJM4c727Kd3ZX7wRfYvVue3lXb65kp22fA4yCQ37C1q3st6IBy3J7RkzgOXW4D6Zr8KUPl7tQVArKAHgcwvHIvFBN4mxb97Lz7V2V1LhPkHHy+lDzic4TLY2NjVahUCBBJMTzvCC/7r7WgBAgD+D0goUL9j7zq995JO3E20FisdOrtm0/LYQ4rarq9OtA73Q9QqDrOjzPo57nWe/tebfq8Wlk1qyulm3bz5dKxfO+75dmKmMniHsDqNSFBzXW2WwW8XicDl0fsrpPnrTkpFwC3JbPKFPXmv/qV/5hsi5MrWsYoagDZOE6VBNQHQ6AQPMpYHsomuVNB32igwxlIsv8Du5J0KnHypRRz0n5sbNogqJYLEI21CAcDqPPmUSxWCxwa86Zxjmz9/32f/j3raSm5uyMvDMPAquWnW75+W/2//d/82drV61atUqfKBIACE11LDNEOV8zeL+UzzB11Kmk1/DnJb9K/H/tnctvU0cUh38zc6+vb+zExECqxL6UFAgQ1TxCSNIsYEcpLKrQboqqSiy6KFVVKlVi1123SP0Pyq4rWPUFFVFQQ0xEybOEJCSAbOdB7AQ78eu+pos7Nw0txdRAgeJPska25esZzZmZM2fOOYOcKsGq9qGuwMPTPf1hDN0KlVt1a1t4IPLxB1vOnz+/hTLPNl0CWZd3OrCm6AiUJbL1LokrZQP6w5/FhAc4MTigF+GHDBgcHIAMGTndguT14V5mCbK/KnTtQnfovUNvhwBMPSCMwxd/ak+n0+26rmt4Qtd0dzlZu7Q48NWsYY2NjRiZiyGZTCLY3GgZhnFX9Vf1fv7pZ5dIIPBU45+fNSRYPTp76dfma9ubRpPJZH1Y8gUAkLU3ZQF/OneaZtkRegQAMpkMr6mpwWw2RZczy/RqNFr2clVbFx4kq2q2AAAELElEQVSMf38h0nO55+ZybLEegJ9ShQAAFZ5uYo6BO4ZM/R+kUVBq9VQUhRuGUbuQTAb7r/SvB9bMjHzidvuZL77UaDav+WwQSYxMd+dsCk/kgjAm2cQpV8e3qK17/krBAM4hCwXJsawBHtEd2RovhhcS8G8JgRUK+f7pibtvdXR0d506+aPa2dLzyJa8oATD4RGto823ODx4f66QC4ATwtxeFFEirk9gEeWd7xNQAgB8Mcvr13uRAuOS7I32ToyWlQvcZeP2NwY2bt+qzOuTSYD7Y4Zw8YazdbZE4m9T9L9lPbr+TCoxNmxwkyi2bthXr44PJ4A1whi/Em2/c3u6valK0SRJIigh+Y/LqiePG4AkPjd0HbIs80wmkzNNc7J1/77eD48f/8HX2fb8z53LRGnaPMZnkkChGAe3a4TbjfhWlG4fsbJvPhX6jodDVYH0AmCTOGl+soA0ZevWUR6LESzlEvB4fQBz/odZDxodmduOEvUvFWOjBgEOjpVUnDRp/YAQRj6bbPvu5CktyKkWMClxElc6vykytxQjQnJGepXY/btWd3dGdHVG4pojxIvDMagS6ixZszUSLxaLsaXsysTu3bu73//kRNR38OClEk144SENG8YAjD3vepQD0bQRAA+90u6/QAKAxMhIy+DAUEtwfa1mFgvQdR2y9PTPnx1hpCCUWNlsNiZRFj12rKv78LGuKNkXKSsMs8L/B0kf/H3v2bPfaoRbYWpzKluUcItCcbVBd5IWpSV0xaq/6t9iRrSIU+oyAedAUbw3JAJKKeeylKKU3vVsCvW9c/ho98ETH53D1189yzZWeEmQ5u8l6vv6eut31gYbnFwsihO7YDyZzujGP7iqIqW0wBiLQZKGKGG/nT59Olrb8nJuVCo8G6RfotGFZDE3N19kc9V+/+Z76TwLBAKE5p0wRmI7h92y6ZhkiND9JMKcUETuHBHqq7qlY8bJqwycc75oG8V8Ph+zFfVWJLLj+oGjR4aaW/YPEk2bfL5Nr/CiQQDg3Ddn3p2/2NcxPTXV6lvIvB4MBsOqTbyUUsJkyZnliIiDNW3Hr9F0rOpM9oAxBkNybIdZ2NyyLJ73SalUKhVfppiKRN6cONB15FakvXOANDWVTHNR4dVkdZfCx6fb7oyP7R35+fKm64MD4fuJGS8hrE6RWMjr8YSrmOyRZZl6ueMwmeNOWl4TNrdtjgKsnGmaiWXK47ZtJ+lr61L797XGO48emmrctXeS1Nb+q5uqKrx6/G3LzOMrezAf09JDN5T4TKxufPRG6Ob4zfDizJzHsiwa8ChQVBVFOHff5fQil2UJG0INuZ3NOxKNu3bFG7RwamNnawrcjFeW4wqPS0n7DV9Z2oO8GcZSRkmn00RfTCOfz0NXGVRVher380AgAFZVnYMiJUgwWDHRVKhQ4eXmD7qjf1tjRSpmAAAAAElFTkSuQmCC"/>
        <div font-weight: bold; font-size: 10pt; italic">MARRIOTT</div>
        <div style="font-size: 10pt; letter-spacing: 2px;">ISTANBUL ASIA</div>
      </div>
      <div style="width: 30%; border: 1px solid #ccc; height: 120px; text-align: center; line-height: 120px; width:60; color: #ccc;">
        FOTOĞRAF
      </div>
    </div>

    <h1 style="text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; font-size: 16px;">İŞ BAŞVURU FORMU</h1>

    <div style="font-size: 9px; text-align: justify; margin-bottom: 20px; line-height: 1.2;">
      <strong>KİŞİSEL VERİLERİN KORUNMASI KANUNUNA İSTİNADEN İŞ MÜRACATINDA BULUNAN ÇALIŞAN ADAYLARINA YÖNELİK BİLGİLENDİRME METNİ</strong><br/>
      Başvuru Formunda belirtilen tüm bilgilerin sizin kişisel bilgilerinizdir. Geçmiş tecrübeleriniz hakkında bilgi sahibi olabilmek ve sizi daha iyi tanıyabilmek amacıyla ekteki Kişisel bilgileriniz, sadece, iş müracaatınız kapsamında değerlendirilecek olup bu amaç dışında herhangi bir şekilde kullanılmayacak ve herhangi bir kurum veya kişi ile paylaşılmayacaktır.
      6698 sayılı Kişisel Verilerin Korunması Kanunu, kişisel verilerin belirlenen amaç dışında başka bir şekilde kullanılmaması, korunması ve hukuka uygun olmayan bir şekilde paylaşılmamasını düzenlemektedir. Bu müraacatınızın sonucunda bağımsız olarak, ileride oluşabilecek pozisyon açıklarında değerlendirilmek üzere, bu "İş Başvuru Formu"nuz müracaat tarihini takip eden yılın başından başlamak üzere 2(iki) yıl boyunca muhafaza edilecek ve 2.yılın sonunda silinecek veya yok edilecektir.
    </div>

    <div style="margin-bottom: 20px;">
      <div style="font-weight: bold; font-size: 14px; background-color: #f0f0f0; padding: 5px; border-bottom: 1px solid #ccc; margin-bottom: 10px;">BAŞVURULAN POZİSYON</div>
      <div style="border-bottom: 1px dotted #ccc; padding-bottom: 5px;">${data.position || ''}</div>
    </div>

    <div style="margin-bottom: 20px;">
      <div style="font-weight: bold; font-size: 14px; background-color: #f0f0f0; padding: 5px; border-bottom: 1px solid #ccc; margin-bottom: 10px;">KİŞİSEL BİLGİLER</div>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="font-weight: bold; width: 150px; padding: 5px;">Adı Soyadı:</td>
          <td style="border-bottom: 1px dotted #ccc; padding: 5px;">${data.fullName || ''}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 5px;">Doğum Tarihi / Yeri:</td>
          <td style="border-bottom: 1px dotted #ccc; padding: 5px;">${data.birthDate || ''} / ${data.birthPlace || ''}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 5px;">TC Kimlik No:</td>
          <td style="border-bottom: 1px dotted #ccc; padding: 5px;">${data.tcNo || ''}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 5px;">Medeni Hali:</td>
          <td style="border-bottom: 1px dotted #ccc; padding: 5px;">${data.maritalStatus || ''}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 5px;">Kan Grubu:</td>
          <td style="border-bottom: 1px dotted #ccc; padding: 5px;">${data.bloodType || ''}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 5px;">Telefon:</td>
          <td style="border-bottom: 1px dotted #ccc; padding: 5px;">${data.mobilePhone || data.homePhone || ''}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 5px;">E-posta:</td>
          <td style="border-bottom: 1px dotted #ccc; padding: 5px;">${data.email || ''}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 5px;">Adres:</td>
          <td style="border-bottom: 1px dotted #ccc; padding: 5px;">${data.address || ''}</td>
        </tr>
      </table>
    </div>

    <div style="margin-bottom: 20px;">
      <div style="font-weight: bold; font-size: 14px; background-color: #f0f0f0; padding: 5px; border-bottom: 1px solid #ccc; margin-bottom: 10px;">DİĞER BİLGİLER</div>
       <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="font-weight: bold; width: 150px; padding: 5px;">Askerlik Durumu:</td>
          <td style="border-bottom: 1px dotted #ccc; padding: 5px;">${data.militaryStatus || ''} ${data.militaryDate || ''} ${data.militaryExemptReason || ''}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 5px;">Sabıka Kaydı:</td>
          <td style="border-bottom: 1px dotted #ccc; padding: 5px;">${data.criminalRecord || ''} ${data.criminalReason ? '(' + data.criminalReason + ')' : ''}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 5px;">Sağlık Problemi:</td>
          <td style="border-bottom: 1px dotted #ccc; padding: 5px;">${data.healthProblem || ''} ${data.healthReason ? '(' + data.healthReason + ')' : ''}</td>
        </tr>
      </table>
    </div>

    <div style="margin-top: 40px; display: flex; justify-content: space-between;">
      <div style="text-align: center;">
        <div style="margin-bottom: 40px;">Tarih</div>
        <div style="border-top: 1px solid #333; width: 150px; padding-top: 5px;">${new Date().toLocaleDateString('tr-TR')}</div>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 40px;">İmza</div>
        <div style="border-top: 1px solid #333; width: 150px; padding-top: 5px;">${data.fullName}</div>
      </div>
    </div>

    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      body { font-family: 'Inter', sans-serif; background-color: #f3f4f6; color: #111827; }

      /* A4 Sayfa ve Yazdırma Ayarları */
      .page {
          width: 210mm;
          min-height: 297mm;
          padding: 10mm 20mm;
          margin: 20px auto;
          background: white;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          position: relative;
      }

      /* Form Çizgileri İçin Yardımcı Sınıf */
      .input-line {
          flex-grow: 1;
          border-bottom: 1px dotted;
          min-height: 1.5rem;
      }

      .checkbox {
          width: 14px;
          height: 14px;
          border: 1px solid #374151;
          display: inline-block;
          margin-right: 0.5rem;
      }

      @media print {
          body { background: white; margin: 0; }
          .page {
              margin: 0;
              box-shadow: none;
              page-break-after: always;
              padding: 10mm 15mm;
          }
          .page:last-child { page-break-after: auto; }
      }
    </style>
  </head>
  <body>
    <div class="page flex flex-col text-[11px] leading-tight">
      <div class="flex items-start justify-between">
        <div class="w-40">
          <div class="">
            <img
              width="65"
              src="data:image/png;base64,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"
            />
            <div class="flex flex-col ml-3">
              <span class="mt-1 text-[15px] font-bold tracking-widest text-black">MARRIOTT</span>
              <span class="text-[15px] tracking-widest text-black">ISTANBUL ASIA</span>
            </div>
          </div>
        </div>
        <div class="flex h-44 w-35 items-center justify-center border border-gray-400 font-semibold text-gray-500">FOTOĞRAF</div>
      </div>

      <h1 class="mb-4 text-center text-lg font-bold">İŞ BAŞVURU FORMU</h1>

      <div class="mb-6 space-y-2 px-4 text-center text-[10px]">
        <p class="font-bold">
          KİŞİSEL VERİLERİN KORUNMASI KANUNUNA İSTİNADEN İŞ MÜRACAATINDA BULUNAN <br />
          ÇALIŞAN ADAYLARINA YÖNELİK BİLGİLENDİRME METNİ
        </p>
        <p>Başvuru Formunda belirtilen tüm bilgiler sizin kişisel bilgilerinizdir. Geçmiş tecrübeleriniz hakkında bilgi sahibi olabilmek ve sizi daha iyi tanıyabilmek amacıyla ekteki Kişisel bilgileriniz, sadece, iş müracaatınız kapsamında değerlendirilecek olup bu amaç dışında herhangi bir şekilde kullanılmayacak ve herhangi bir kurum veya kişi ile paylaşılmayacaktır.</p>
        <p>6698 sayılı Kişisel Verilerin Korunması Kanunu, kişisel verilerin belirlenen amaç dışında başka bir şekilde kullanılmaması, korunması ve hukuka uygun olmayan bir şekilde paylaşılmamasını düzenlemektedir.</p>
        <p>Bu müracaatınızın sonucundan bağımsız olarak, ileride oluşabilecek pozisyon açıklarında değerlendirilmek üzere, bu "İş Başvuru Formu"nuz, müracaat tarihini takip eden yılın başından başlamak üzere 2 (iki) yıl boyunca muhafaza edilecek ve 2. yılın sonunda silinecek veya yok edilecektir.</p>
      </div>

      <div class="mb-6">
        <div class="mb-2 border-b-1 border-t-1 pb-1 pt-1 border-gray-500">
          <h2 class="text-sm font-bold">BAŞVURULAN POZİSYON</h2>
        </div>
        
        <div class="mt-2 flex"><div class="input-line"></div></div>
        <div class="mt-3 flex"><div class="input-line"></div></div>
      </div>

      <div class="mb-4">
        <div class="mb-2 border-b-1 border-t-1 pb-1 pt-1 border-gray-500">
        <h2 class="text-sm font-bold">KİŞİSEL BİLGİLER</h2>
        </div>
        <div class="space-y-3 font-bold">
          <div class="flex">
            <span class="w-48 whitespace-nowrap mt-3">Adınız ve Soyadınız</span>
            <div class="input-line"></div>
          </div>
          <div class="flex">
            <span class="w-48 whitespace-nowrap mt-3">Doğum Yeriniz ve Tarihiniz</span>
            <div class="input-line"></div>
            <span class="mr-2 ml-4 mt-3">Kan Grubunuz</span>
            <div class="input-line w-32 flex-none"></div>
          </div>

          <div class="flex items-center">
            <span class="w-48 whitespace-nowrap">Cinsiyetiniz</span>
            <div class="flex gap-x-39">
              <label class="flex items-center"><span class="checkbox"></span>Kadın</label><label class="flex items-center"><span class="checkbox"></span>Erkek</label>
            </div>
          </div>

          <div class="flex items-center">
            <span class="w-48 whitespace-nowrap">Uyruğunuz</span>
            <div class="flex w-48 gap-8">
              <label class="flex items-center"><span class="checkbox"></span>T.C</label><label class="flex items-center"><span class="checkbox"></span>Diğer</label>
            </div>
            <span class="mr-2 ml-4 mt-3 whitespace-nowrap">T.C Kimlik Numarası</span>
            <div class="input-line"></div>
          </div>

          <div class="flex items-center">
            <span class="w-48 whitespace-nowrap">Medeni Durumunuz</span>
            <div class="flex gap-8">
              <label class="flex items-center"><span class="checkbox"></span>Evli</label><label class="flex items-center"><span class="checkbox"></span>Bekar</label>
            </div>
          </div>

          <div class="flex">
            <span class="w-48 whitespace-nowrap mt-3">Eşinizin Adı ve Mesleği</span>
            <div class="input-line"></div>
          </div>
          <div class="flex">
            <span class="w-48 whitespace-nowrap mt-3">Babanızın Adı ve Mesleği</span>
            <div class="input-line"></div>
          </div>
          <div class="flex">
            <span class="w-48 whitespace-nowrap mt-3">Çocukların varsa, sayıları ve yaşları</span>
            <div class="input-line ml-4"></div>
          </div>

          <div class="mt-4 flex">
            <span class="w-48 whitespace-nowrap mt-3">Sürekli Ev Adresiniz</span>
            <div class="input-line"></div>
          </div>
          <div class="flex"><div class="input-line"></div></div>

          <div class="flex w-3">
            <span class="w-24 whitespace-nowrap mt-4">Ev Telefonu</span>
            <div class="input-line w-32 flex-none ml-3"></div>
            <span class="ml-4 w-24 whitespace-nowrap mt-4">Cep Telefonu</span>
            <div class="input-line w-32 flex-none ml-3"></div>
            <span class="w-12 whitespace-nowrap mt-4 ml-3">E-mail</span>
            <div class="input-line w-39 flex-none ml-3"></div>
          </div>

          <div class="flex">
            <span class="w-72 whitespace-nowrap mr-9">Size ulaşamadığımızda arayabileceğimiz kişi ve numarası</span>
            <div class="input-line"></div>
          </div>

          <div class="mt-2 flex items-start">
            <span class="mt-1 w-48 whitespace-nowrap">Askerlik Durumunuz</span>
            <div class="flex w-full flex-col gap-2">
              <label class="flex items-center"
                ><span class="checkbox"></span>Tamamlandı, Terhis yeri, Tarihi
                <div class="input-line"></div
              ></label>
              <div class="flex w-full">
                <label class="flex w-1/2 items-center"
                  ><span class="checkbox"></span>Tecil Süresi
                  <div class="input-line"></div
                ></label>
                <label class="flex w-full items-center"
                  ><span class="checkbox invisible"></span>Muaf ise, nedeni
                  <div class="input-line"></div
                ></label>
              </div>
            </div>
          </div>

          <div class="mt-2 flex items-center border-t border-gray-300 pt-3">
            <span class="w-[28rem]">Sabıka kaydınız var mı? Var ise nedenini belirtiniz.</span>
            <label class="mr-6 flex items-center"><span class="checkbox"></span>Hayır</label>
            <label class="flex items-center"><span class="checkbox"></span>Evet</label>
            <div class="input-line"></div>
          </div>
          <div class="mt-1 flex items-center border-t border-gray-300 pt-3">
            <span class="w-[28rem]">Herhangi bir sağlık probleminiz var mı? Var ise belirtiniz.</span>
            <label class="mr-6 flex items-center"><span class="checkbox"></span>Hayır</label>
            <label class="flex items-center"><span class="checkbox"></span>Evet</label>
            <div class="input-line"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="page flex flex-col text-[11px] leading-tight">
      <div class="mb-2 border-b-1 border-t-1 pb-1 pt-2 border-gray-500">
        <h2 class="text-center text-sm font-bold">ÖĞRENİM DURUMU</h2>
        </div>
      

      <table class="mt-3 mb-10 w-full border-collapse border border-gray-400 text-center">
        <thead>
          <tr>
            <th class="w-1/4 border border-gray-400 bg-gray-50 p-7 font-normal text-gray-600"></th>
            <th class="w-1/4 border border-gray-400 pb-7 font-normal">Okul Adı</th>
            <th class="w-1/4 border border-gray-400 pb-7 font-normal">Bölüm</th>
            <th class="w-1/4 border border-gray-400 pb-7 font-normal">Mezuniyet Yılı</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-400 p-5">İlköğretim</td>
            <td class="border border-gray-400"></td>
            <td class="border border-gray-400"></td>
            <td class="border border-gray-400"></td>
          </tr>
          <tr>
            <td class="border border-gray-400 p-5">Lise</td>
            <td class="border border-gray-400"></td>
            <td class="border border-gray-400"></td>
            <td class="border border-gray-400"></td>
          </tr>
          <tr>
            <td class="border border-gray-400 p-5">Üniversite</td>
            <td class="border border-gray-400"></td>
            <td class="border border-gray-400"></td>
            <td class="border border-gray-400"></td>
          </tr>
          <tr>
            <td class="border border-gray-400 p-5">Lisansüstü</td>
            <td class="border border-gray-400"></td>
            <td class="border border-gray-400"></td>
            <td class="border border-gray-400"></td>
          </tr>
          <tr>
            <td class="border border-gray-400 p-5">Sertifika vb.</td>
            <td class="border border-gray-400"></td>
            <td class="border border-gray-400"></td>
            <td class="border border-gray-400"></td>
          </tr>
        </tbody>
      </table>

      <p class="mb-2">Katıldığınız kurs ve / veya seminerler</p>
      <table class="mb-8 w-full border-collapse border border-gray-400 text-center">
        <thead>
          <tr>
            <th class="w-1/3 border border-gray-400 p-4 font-normal">Konu</th>
            <th class="w-1/3 border border-gray-400 p-4 font-normal">Kurum - Kuruluş</th>
            <th class="w-1/3 border border-gray-400 p-4 font-normal">Tarih - Süre</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-400 p-5"></td>
            <td class="border border-gray-400"></td>
            <td class="border border-gray-400"></td>
          </tr>
          <tr>
            <td class="border border-gray-400 p-5"></td>
            <td class="border border-gray-400"></td>
            <td class="border border-gray-400"></td>
          </tr>
          <tr>
            <td class="border border-gray-400 p-5"></td>
            <td class="border border-gray-400"></td>
            <td class="border border-gray-400"></td>
          </tr>
        </tbody>
      </table>

      <p class="mb-2">Bildiğiniz yabancı diller</p>
      <table class="mb-5 w-full border-collapse border border-gray-400 text-center">
        <thead>
          <tr>
            <th class="w-1/4 border border-gray-400 p-10 font-normal" rowspan="2">Yabancı Dil</th>
            <th class="w-1/4 border border-gray-400 p-2 font-normal" colspan="3">Okuma</th>
            <th class="w-1/4 border border-gray-400 p-2 font-normal" colspan="3">Yazma (Writing)</th>
            <th class="w-1/4 border border-gray-400 p-2 font-normal" colspan="3">Konuşma (Speaking)</th>
          </tr>
          <tr>
            <th class="border border-gray-400 p-3 text-[10px] font-normal">Az</th>
            <th class="border border-gray-400 p-2 text-[10px] font-normal">Orta</th>
            <th class="border border-gray-400 p-3 text-[10px] font-normal">İyi</th>
            <th class="border border-gray-400 p-3 text-[10px] font-normal">Az</th>
            <th class="border border-gray-400 p-2 text-[10px] font-normal">Orta</th>
            <th class="border border-gray-400 p-3 text-[10px] font-normal">İyi</th>
            <th class="border border-gray-400 p-3 text-[10px] font-normal">Az</th>
            <th class="border border-gray-400 p-2 text-[10px] font-normal">Orta</th>
            <th class="border border-gray-400 p-3 text-[10px] font-normal">İyi</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-400 p-4"></td>
            <td class="border border-gray-400"></td>
            <td class="border border-gray-400"></td>
            <td class="border border-gray-400"></td>
            <td class="border border-gray-400"></td>
            <td class="border border-gray-400"></td>
            <td class="border border-gray-400"></td>
            <td class="border border-gray-400"></td>
            <td class="border border-gray-400"></td>
            <td class="border border-gray-400"></td>
          </tr>
          <tr>
            <td class="border border-gray-400 p-4"></td>
            <td class="border border-gray-400"></td>
            <td class="border border-gray-400"></td>
            <td class="border border-gray-400"></td>
            <td class="border border-gray-400"></td>
            <td class="border border-gray-400"></td>
            <td class="border border-gray-400"></td>
            <td class="border border-gray-400"></td>
            <td class="border border-gray-400"></td>
            <td class="border border-gray-400"></td>
          </tr>
          <tr>
            <td class="border border-gray-400 p-4"></td>
            <td class="border border-gray-400"></td>
            <td class="border border-gray-400"></td>
            <td class="border border-gray-400"></td>
            <td class="border border-gray-400"></td>
            <td class="border border-gray-400"></td>
            <td class="border border-gray-400"></td>
            <td class="border border-gray-400"></td>
            <td class="border border-gray-400"></td>
            <td class="border border-gray-400"></td>
          </tr>
        </tbody>
      </table>

      <div class="h-32 border border-gray-400 pt-7 text-gray-500">Yabancı dil / diller nerede öğrendiniz?</div>
    </div>

    <div class="page flex flex-col text-[11px] leading-tight">
      <div class="mb-2 border-b-1 border-t-1 pb-1 pt-2 border-gray-500">
        <h2 class="text-center text-sm font-bold">GENEL BİLGİLER</h2>
        </div>
      

      <div class="mb-8 space-y-4">
        <div>
          <p class="mb-2">Kullandığınız bilgisayar programları</p>
          <div class="flex"><div class="input-line ml-0 w-full"></div></div>
          <div class="mt-3 flex"><div class="input-line ml-0 w-full"></div></div>
        </div>

        <div class="mt-6">
          <p class="mb-2">Kültürel, sosyal ve sportif faaliyetleriniz</p>
          <div class="flex"><div class="input-line ml-0 w-full"></div></div>
          <div class="mt-3 flex"><div class="input-line ml-0 w-full"></div></div>
        </div>

        <div class="mt-6 space-y-3">
          <div class="flex items-center">
            <span class="w-48">Sürücü ehliyetiniz var mı?</span>
            <label class="mr-6 flex items-center"><span class="checkbox"></span>Hayır</label>
            <label class="flex w-24 items-center"><span class="checkbox"></span>Evet</label>
            <span class="mr-2">Sınıfı</span>
            <div class="input-line w-24 flex-none"></div>
            <span class="mr-2 ml-4">Yılı</span>
            <div class="input-line w-24 flex-none"></div>
          </div>
          <div class="flex items-center">
            <span class="w-48">Sigara kullanıyor musunuz?</span>
            <label class="mr-6 flex items-center"><span class="checkbox"></span>Hayır</label>
            <label class="flex items-center"><span class="checkbox"></span>Evet</label>
          </div>
          <div class="flex items-center">
            <span class="w-48">Alkol kullanıyor musunuz?</span>
            <label class="mr-6 flex items-center"><span class="checkbox"></span>Hayır</label>
            <label class="mr-6 flex items-center"><span class="checkbox"></span>Evet</label>
            <label class="flex items-center"><span class="checkbox"></span>Nadiren</label>
          </div>
        </div>
      </div>

      <div class="mb-2 border-b-1 border-t-1 pb-1 pt-2 border-gray-500">
        <h2 class="text-center text-sm font-bold">REFERANSLAR</h2>
        </div>
      
      <p class="mb-2">Hakkınızda iş tecrübenizle ilgili referans verebilecek kişilerin isimlerini belirtiniz.</p>

      <table class="mb-6 w-full border-collapse border border-gray-400 text-center">
        <thead>
          <tr>
            <th class="w-1/3 border border-gray-400 p-4 font-normal">Adı - Soyadı</th>
            <th class="w-1/3 border border-gray-400 p-4 font-normal">Şirket - Pozisyon</th>
            <th class="w-1/3 border border-gray-400 p-4 font-normal">Telefon Numarası</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-400 p-6"></td>
            <td class="border border-gray-400"></td>
            <td class="border border-gray-400"></td>
          </tr>
          <tr>
            <td class="border border-gray-400 p-6"></td>
            <td class="border border-gray-400"></td>
            <td class="border border-gray-400"></td>
          </tr>
          <tr>
            <td class="border border-gray-400 p-6"></td>
            <td class="border border-gray-400"></td>
            <td class="border border-gray-400"></td>
          </tr>
        </tbody>
      </table>

      <div class="mb-8 space-y-6">
        <div>
          <p class="mb-2">İstanbul Marriott Hotel Asia'da çalışmakta olan akrabanız ve / veya tanıdığınız var mı?</p>
          <div class="flex"><div class="input-line ml-0 w-full"></div></div>
          <div class="mt-3 flex"><div class="input-line ml-0 w-full"></div></div>
        </div>
        <div>
          <p class="mb-2">İstanbul Marriott Hotel Asia'ya ilk başvurunuz mu? Değil ise, önceki başvurunuz hakkında bilgi veriniz.</p>
          <div class="flex"><div class="input-line ml-0 w-full"></div></div>
          <div class="mt-3 flex"><div class="input-line ml-0 w-full"></div></div>
        </div>
      </div>

      <h2 class="mb-4 w-full pt-2 border-b-1 border-t-1 border-gray-500 pb-1 text-sm font-bold">İSTİHDAM VE GELİR DURUMU</h2>
      <div class="space-y-3">
        <div class="flex">
          <span class="w-48">İstediğiniz ücreti belirtiniz (NET)</span>
          <div class="input-line"></div>
        </div>
        <div class="flex">
          <span class="w-48">Ne zaman işe başlayabilirsiniz?</span>
          <div class="input-line"></div>
        </div>
      </div>
    </div>

    <div class="page flex flex-col text-[11px] leading-tight">
      <h2 class="mb-4 w-full pt-2 border-b-1 border-t-1 border-gray-500 pb-1 text-sm font-bold text-center">İŞ TECRÜBELERİ</h2>
      <p class="mb-4 font-bold">Son işyerinizden başlayarak, daha önce çalışmış olduğunuz işyerleri ile ilgili bilgileri aşağıda belirtiniz.</p>

      <div class="flex-grow space-y-4">
        <div class="space-y-3 rounded-sm border border-gray-400 bg-[#f9fafb] p-4 pb-6 print:bg-transparent">
          <div class="flex">
            <span class="w-48">İşyerinin adı ve ünvanı</span>
            <div class="input-line border-gray-300"></div>
          </div>
          <div class="flex">
            <span class="w-48">Adres ve telefon</span>
            <div class="input-line border-gray-300"></div>
          </div>
          <div class="flex">
            <span class="w-48">Pozisyon</span>
            <div class="input-line border-gray-300"></div>
          </div>
          <div class="flex">
            <span class="w-48">Aylık net gelir</span>
            <div class="input-line border-gray-300"></div>
          </div>
          <div class="flex">
            <span class="w-48">Yöneticinin adı soyadı</span>
            <div class="input-line border-gray-300"></div>
          </div>
          <div class="flex">
            <span class="w-48">İşe başlangıç ve çıkış tarihleri</span>
            <div class="input-line border-gray-300"></div>
          </div>
          <div class="flex">
            <span class="w-48">İşten ayrılış sebebiniz</span>
            <div class="input-line border-gray-300"></div>
          </div>
        </div>

        <div class="space-y-3 rounded-sm border border-gray-400 bg-[#f9fafb] p-4 pb-6 print:bg-transparent">
          <div class="flex">
            <span class="w-48">İşyerinin adı ve ünvanı</span>
            <div class="input-line border-gray-300"></div>
          </div>
          <div class="flex">
            <span class="w-48">Adres ve telefon</span>
            <div class="input-line border-gray-300"></div>
          </div>
          <div class="flex">
            <span class="w-48">Pozisyon</span>
            <div class="input-line border-gray-300"></div>
          </div>
          <div class="flex">
            <span class="w-48">Aylık net gelir</span>
            <div class="input-line border-gray-300"></div>
          </div>
          <div class="flex">
            <span class="w-48">Yöneticinin adı soyadı</span>
            <div class="input-line border-gray-300"></div>
          </div>
          <div class="flex">
            <span class="w-48">İşe başlangıç ve çıkış tarihleri</span>
            <div class="input-line border-gray-300"></div>
          </div>
          <div class="flex">
            <span class="w-48">İşten ayrılış sebebiniz</span>
            <div class="input-line border-gray-300"></div>
          </div>
        </div>

        <div class="space-y-3 rounded-sm border border-gray-400 bg-[#f9fafb] p-4 pb-6 print:bg-transparent">
          <div class="flex">
            <span class="w-48">İşyerinin adı ve ünvanı</span>
            <div class="input-line border-gray-300"></div>
          </div>
          <div class="flex">
            <span class="w-48">Adres ve telefon</span>
            <div class="input-line border-gray-300"></div>
          </div>
          <div class="flex">
            <span class="w-48">Pozisyon</span>
            <div class="input-line border-gray-300"></div>
          </div>
          <div class="flex">
            <span class="w-48">Aylık net gelir</span>
            <div class="input-line border-gray-300"></div>
          </div>
          <div class="flex">
            <span class="w-48">Yöneticinin adı soyadı</span>
            <div class="input-line border-gray-300"></div>
          </div>
          <div class="flex">
            <span class="w-48">İşe başlangıç ve çıkış tarihleri</span>
            <div class="input-line border-gray-300"></div>
          </div>
          <div class="flex">
            <span class="w-48">İşten ayrılış sebebiniz</span>
            <div class="input-line border-gray-300"></div>
          </div>
        </div>
      </div>

      <div class="mt-6 text-justify text-[10px] text-gray-700">
        <p>Bu iş istek formunda verdiğim bilgilerin, yazdıklarımın muhtemel bir hizmet akdine esas teşkil ettiğini; bunların doğru, eksiksiz ve gerçeğe uygun olduğunu, aksi halde hizmet akdinin ihbarsız ve tazminatsız feshedileceğini, istihdamım halinde kuruluşun talimat ve prosedürlerine göre çalışmayı kabul ettiğimi ve iş kanunlarında belirtilen deneme süresine tabi olacağımı ayrıca, kişisel verilerimin koruması ile ilgili tarafıma bilgilendirme yapılmış olup,</p>
        <ul class="mt-1 list-disc pl-4">
          <li>Kişisel verilerimin sadece bu iş müracaatı kapsamında işlenmesine,</li>
          <li>İş Müracaat Formunda belirttiğim referanslardan sorgulama yapılmasına,</li>
          <li>Önceki çalıştığım iş yerlerinden de referans kontrolü yapılmasına,</li>
        </ul>
        <p class="mt-1">açık rızam olduğunu beyan ve taahhüt ederim.</p>
      </div>

      <div class="mt-12 mb-16 flex justify-between px-12 font-bold">
        <span>ADI - SOYADI</span>
        <span>TARİH</span>
        <span>İMZA</span>
      </div>

      <div class="mt-auto border-t border-gray-300 pt-4 text-center text-[10px] text-gray-500">
        Kayışdağı Caddesi No: 3 Ataşehir 34750 Istanbul - Türkiye Telefon : +90 (216) 570 00 00 Fax : +90 (216) 469 29 41<br />
        www.marriottistanbulasia.com
      </div>
    </div>
  `;

  const opt = {
    margin: 10,
    filename: `marriott_basvuru_${data.fullName.replace(/\s+/g, '_').toLowerCase()}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().from(element).set(opt).save();
};

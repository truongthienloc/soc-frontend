.text

#The program checks the ALU instruction in R_type

Main:
		addi    x21 , x0 , 57 
		addi    x10 , x0 , -42 
		addi    x16 , x0 , 3 
		addi    x6 , x0 , 122 
		addi    x25 , x0 , 0 
		blt     x21 , x10 , Less_r 
		bge     x21 , x10 , Bigger_r 
Less_r:
		sub     x23 , x16 , x6 
		and     x20 , x16 , x6 
		add     x20 , x20 , x23 
		srl     x20 , x20 , x25 
		addi    x12 , x0 , -117 
		bne     x20 , x12 , Fail 
Bigger_r:
		or      x23 , x16 , x6 
		xor     x20 , x16 , x6 
		add     x20 , x20 , x23 
		sra     x20 , x20 , x25 
		addi    x12 , x0 , 244 
		bne     x20 , x12 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 

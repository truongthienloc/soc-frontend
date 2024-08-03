.text

#The program checks the ALU instruction in R_type

Main:
		addi    x29 , x0 , 2 
		addi    x3 , x0 , -97 
		addi    x24 , x0 , 51 
		addi    x23 , x0 , 68 
		addi    x5 , x0 , 4 
		blt     x29 , x3 , Less_r 
		bge     x29 , x3 , Bigger_r 
Less_r:
		sub     x18 , x24 , x23 
		and     x27 , x24 , x23 
		slt     x27 , x27 , x18 
		srl     x27 , x27 , x5 
		addi    x28 , x0 , -2 
		bne     x27 , x28 , Fail 
Bigger_r:
		or      x18 , x24 , x23 
		xor     x27 , x24 , x23 
		sltu     x27 , x27 , x18 
		sra     x27 , x27 , x5 
		addi    x28 , x0 , 14 
		bne     x27 , x28 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 

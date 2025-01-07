.text

#The program checks the ALU instruction in R_type

Main:
		addi    x30 , x0 , 24 
		addi    x23 , x0 , -75 
		addi    x5 , x0 , 161 
		addi    x24 , x0 , 67 
		addi    x17 , x0 , 4 
		blt     x30 , x23 , Less_r 
		bge     x30 , x23 , Bigger_r 
Less_r:
		sub     x22 , x5 , x24 
		and     x7 , x5 , x24 
		slt     x7 , x7 , x22 
		srl     x7 , x7 , x17 
		addi    x29 , x0 , 5 
		bne     x7 , x29 , Fail 
Bigger_r:
		or      x22 , x5 , x24 
		xor     x7 , x5 , x24 
		sltu     x7 , x7 , x22 
		sra     x7 , x7 , x17 
		addi    x29 , x0 , 28 
		bne     x7 , x29 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 

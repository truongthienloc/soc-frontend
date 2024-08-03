.text

#The program checks the ALU instruction in R_type

Main:
		addi    x3 , x0 , 20 
		addi    x29 , x0 , -79 
		addi    x30 , x0 , 65 
		addi    x26 , x0 , 137 
		addi    x23 , x0 , 3 
		blt     x3 , x29 , Less_r 
		bge     x3 , x29 , Bigger_r 
Less_r:
		sub     x13 , x30 , x26 
		and     x10 , x30 , x26 
		slt     x10 , x10 , x13 
		srl     x10 , x10 , x23 
		addi    x21 , x0 , -9 
		bne     x10 , x21 , Fail 
Bigger_r:
		or      x13 , x30 , x26 
		xor     x10 , x30 , x26 
		sltu     x10 , x10 , x13 
		sra     x10 , x10 , x23 
		addi    x21 , x0 , 50 
		bne     x10 , x21 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 

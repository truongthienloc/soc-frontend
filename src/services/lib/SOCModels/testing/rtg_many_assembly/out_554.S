.text

#The program checks the ALU instruction in R_type

Main:
		addi    x17 , x0 , 10 
		addi    x8 , x0 , -89 
		addi    x29 , x0 , 142 
		addi    x1 , x0 , 195 
		addi    x14 , x0 , 1 
		blt     x17 , x8 , Less_r 
		bge     x17 , x8 , Bigger_r 
Less_r:
		sub     x9 , x29 , x1 
		and     x20 , x29 , x1 
		slt     x20 , x20 , x9 
		srl     x20 , x20 , x14 
		addi    x30 , x0 , 38 
		bne     x20 , x30 , Fail 
Bigger_r:
		or      x9 , x29 , x1 
		xor     x20 , x29 , x1 
		sltu     x20 , x20 , x9 
		sra     x20 , x20 , x14 
		addi    x30 , x0 , 142 
		bne     x20 , x30 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 

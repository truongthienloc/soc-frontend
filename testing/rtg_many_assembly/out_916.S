.text

#The program checks the ALU instruction in R_type

Main:
		addi    x15 , x0 , 185 
		addi    x27 , x0 , 86 
		addi    x24 , x0 , 85 
		addi    x4 , x0 , 143 
		addi    x5 , x0 , 1 
		blt     x15 , x27 , Less_r 
		bge     x15 , x27 , Bigger_r 
Less_r:
		sub     x29 , x24 , x4 
		and     x17 , x24 , x4 
		slt     x17 , x17 , x29 
		srl     x17 , x17 , x5 
		addi    x30 , x0 , -27 
		bne     x17 , x30 , Fail 
Bigger_r:
		or      x29 , x24 , x4 
		xor     x17 , x24 , x4 
		sltu     x17 , x17 , x29 
		sra     x17 , x17 , x5 
		addi    x30 , x0 , 220 
		bne     x17 , x30 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 

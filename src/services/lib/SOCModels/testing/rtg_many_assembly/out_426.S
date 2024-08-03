.text

#The program checks the ALU instruction in R_type

Main:
		addi    x24 , x0 , 156 
		addi    x28 , x0 , 57 
		addi    x8 , x0 , 35 
		addi    x17 , x0 , 120 
		addi    x1 , x0 , 0 
		blt     x24 , x28 , Less_r 
		bge     x24 , x28 , Bigger_r 
Less_r:
		sub     x23 , x8 , x17 
		and     x27 , x8 , x17 
		slt     x27 , x27 , x23 
		srl     x27 , x27 , x1 
		addi    x4 , x0 , -53 
		bne     x27 , x4 , Fail 
Bigger_r:
		or      x23 , x8 , x17 
		xor     x27 , x8 , x17 
		sltu     x27 , x27 , x23 
		sra     x27 , x27 , x1 
		addi    x4 , x0 , 214 
		bne     x27 , x4 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 

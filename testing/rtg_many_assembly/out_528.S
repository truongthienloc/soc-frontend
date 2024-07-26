.text

#The program checks the ALU instruction in R_type

Main:
		addi    x8 , x0 , 160 
		addi    x21 , x0 , 61 
		addi    x1 , x0 , 4 
		addi    x18 , x0 , 178 
		addi    x24 , x0 , 1 
		blt     x8 , x21 , Less_r 
		bge     x8 , x21 , Bigger_r 
Less_r:
		sub     x28 , x1 , x18 
		and     x5 , x1 , x18 
		slt     x5 , x5 , x28 
		srl     x5 , x5 , x24 
		addi    x27 , x0 , -87 
		bne     x5 , x27 , Fail 
Bigger_r:
		or      x28 , x1 , x18 
		xor     x5 , x1 , x18 
		sltu     x5 , x5 , x28 
		sra     x5 , x5 , x24 
		addi    x27 , x0 , 182 
		bne     x5 , x27 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 

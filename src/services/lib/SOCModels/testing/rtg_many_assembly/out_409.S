.text

#The program checks the ALU instruction in R_type

Main:
		addi    x3 , x0 , 144 
		addi    x28 , x0 , 45 
		addi    x20 , x0 , 90 
		addi    x8 , x0 , 49 
		addi    x18 , x0 , 1 
		blt     x3 , x28 , Less_r 
		bge     x3 , x28 , Bigger_r 
Less_r:
		sub     x17 , x20 , x8 
		and     x25 , x20 , x8 
		slt     x25 , x25 , x17 
		srl     x25 , x25 , x18 
		addi    x12 , x0 , 28 
		bne     x25 , x12 , Fail 
Bigger_r:
		or      x17 , x20 , x8 
		xor     x25 , x20 , x8 
		sltu     x25 , x25 , x17 
		sra     x25 , x25 , x18 
		addi    x12 , x0 , 115 
		bne     x25 , x12 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 

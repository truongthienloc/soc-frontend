.text

#The program checks the ALU instruction in R_type

Main:
		addi    x27 , x0 , 67 
		addi    x31 , x0 , -32 
		addi    x28 , x0 , 71 
		addi    x18 , x0 , 106 
		addi    x22 , x0 , 2 
		blt     x27 , x31 , Less_r 
		bge     x27 , x31 , Bigger_r 
Less_r:
		sub     x17 , x28 , x18 
		and     x4 , x28 , x18 
		add     x4 , x4 , x17 
		srl     x4 , x4 , x22 
		addi    x13 , x0 , 7 
		bne     x4 , x13 , Fail 
Bigger_r:
		or      x17 , x28 , x18 
		xor     x4 , x28 , x18 
		add     x4 , x4 , x17 
		sra     x4 , x4 , x22 
		addi    x13 , x0 , 39 
		bne     x4 , x13 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 

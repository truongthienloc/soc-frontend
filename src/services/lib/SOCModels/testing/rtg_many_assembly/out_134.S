.text

#The program checks the ALU instruction in R_type

Main:
		addi    x23 , x0 , 126 
		addi    x28 , x0 , 27 
		addi    x21 , x0 , 11 
		addi    x17 , x0 , 80 
		addi    x22 , x0 , 0 
		blt     x23 , x28 , Less_r 
		bge     x23 , x28 , Bigger_r 
Less_r:
		sub     x14 , x21 , x17 
		and     x27 , x21 , x17 
		slti    x27 , x27 , 165 
		srl     x27 , x27 , x22 
		addi    x20 , x0 , -69 
		bne     x27 , x20 , Fail 
Bigger_r:
		or      x14 , x21 , x17 
		xor     x27 , x21 , x17 
		sltiu   x27 , x27 , 39 
		sra     x27 , x27 , x22 
		addi    x20 , x0 , 182 
		bne     x27 , x20 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 

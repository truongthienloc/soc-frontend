.text

#The program checks the ALU instruction in R_type

Main:
		addi    x8 , x0 , 147 
		addi    x22 , x0 , 48 
		addi    x13 , x0 , 52 
		addi    x28 , x0 , 66 
		addi    x15 , x0 , 4 
		blt     x8 , x22 , Less_r 
		bge     x8 , x22 , Bigger_r 
Less_r:
		sub     x9 , x13 , x28 
		and     x21 , x13 , x28 
		slti    x21 , x21 , 14 
		srl     x21 , x21 , x15 
		addi    x17 , x0 , -1 
		bne     x21 , x17 , Fail 
Bigger_r:
		or      x9 , x13 , x28 
		xor     x21 , x13 , x28 
		sltiu   x21 , x21 , 159 
		sra     x21 , x21 , x15 
		addi    x17 , x0 , 14 
		bne     x21 , x17 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 

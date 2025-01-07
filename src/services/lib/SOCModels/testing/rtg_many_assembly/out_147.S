.text

#The program checks the ALU instruction in R_type

Main:
		addi    x25 , x0 , 179 
		addi    x1 , x0 , 80 
		addi    x9 , x0 , 32 
		addi    x28 , x0 , 158 
		addi    x22 , x0 , 4 
		blt     x25 , x1 , Less_r 
		bge     x25 , x1 , Bigger_r 
Less_r:
		sub     x20 , x9 , x28 
		and     x17 , x9 , x28 
		slti    x17 , x17 , 173 
		srl     x17 , x17 , x22 
		addi    x27 , x0 , -8 
		bne     x17 , x27 , Fail 
Bigger_r:
		or      x20 , x9 , x28 
		xor     x17 , x9 , x28 
		sltiu   x17 , x17 , 67 
		sra     x17 , x17 , x22 
		addi    x27 , x0 , 23 
		bne     x17 , x27 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 

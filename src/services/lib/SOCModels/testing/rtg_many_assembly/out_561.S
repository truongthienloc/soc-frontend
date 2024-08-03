.text

#The program checks the ALU instruction in R_type

Main:
		addi    x1 , x0 , 128 
		addi    x21 , x0 , 29 
		addi    x8 , x0 , 16 
		addi    x16 , x0 , 6 
		addi    x28 , x0 , 1 
		blt     x1 , x21 , Less_r 
		bge     x1 , x21 , Bigger_r 
Less_r:
		sub     x30 , x8 , x16 
		and     x2 , x8 , x16 
		slti    x2 , x2 , 183 
		srl     x2 , x2 , x28 
		addi    x25 , x0 , 5 
		bne     x2 , x25 , Fail 
Bigger_r:
		or      x30 , x8 , x16 
		xor     x2 , x8 , x16 
		sltiu   x2 , x2 , 178 
		sra     x2 , x2 , x28 
		addi    x25 , x0 , 22 
		bne     x2 , x25 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 

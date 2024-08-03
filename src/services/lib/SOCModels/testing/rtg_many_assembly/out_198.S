.text

#The program checks the ALU instruction in R_type

Main:
		addi    x19 , x0 , 99 
		addi    x21 , x0 , 0 
		addi    x28 , x0 , 104 
		addi    x15 , x0 , 48 
		addi    x18 , x0 , 3 
		blt     x19 , x21 , Less_r 
		bge     x19 , x21 , Bigger_r 
Less_r:
		sub     x20 , x28 , x15 
		and     x6 , x28 , x15 
		slti    x6 , x6 , 131 
		srl     x6 , x6 , x18 
		addi    x27 , x0 , 11 
		bne     x6 , x27 , Fail 
Bigger_r:
		or      x20 , x28 , x15 
		xor     x6 , x28 , x15 
		sltiu   x6 , x6 , 11 
		sra     x6 , x6 , x18 
		addi    x27 , x0 , 26 
		bne     x6 , x27 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 

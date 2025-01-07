.text

#The program checks the ALU instruction in R_type

Main:
		addi    x30 , x0 , 180 
		addi    x15 , x0 , 81 
		addi    x2 , x0 , 110 
		addi    x8 , x0 , 113 
		addi    x10 , x0 , 4 
		blt     x30 , x15 , Less_r 
		bge     x30 , x15 , Bigger_r 
Less_r:
		sub     x3 , x2 , x8 
		and     x21 , x2 , x8 
		slti    x21 , x21 , 40 
		srl     x21 , x21 , x10 
		addi    x13 , x0 , 5 
		bne     x21 , x13 , Fail 
Bigger_r:
		or      x3 , x2 , x8 
		xor     x21 , x2 , x8 
		sltiu   x21 , x21 , 191 
		sra     x21 , x21 , x10 
		addi    x13 , x0 , 9 
		bne     x21 , x13 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 

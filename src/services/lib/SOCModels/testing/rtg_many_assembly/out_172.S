.text

#The program checks the ALU instruction in R_type

Main:
		addi    x17 , x0 , 113 
		addi    x10 , x0 , 14 
		addi    x16 , x0 , 97 
		addi    x9 , x0 , 22 
		addi    x12 , x0 , 2 
		blt     x17 , x10 , Less_r 
		bge     x17 , x10 , Bigger_r 
Less_r:
		sub     x24 , x16 , x9 
		and     x2 , x16 , x9 
		slti    x2 , x2 , 11 
		srl     x2 , x2 , x12 
		addi    x26 , x0 , 18 
		bne     x2 , x26 , Fail 
Bigger_r:
		or      x24 , x16 , x9 
		xor     x2 , x16 , x9 
		sltiu   x2 , x2 , 20 
		sra     x2 , x2 , x12 
		addi    x26 , x0 , 59 
		bne     x2 , x26 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 

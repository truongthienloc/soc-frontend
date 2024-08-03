.text

#The program checks the ALU instruction in R_type

Main:
		addi    x18 , x0 , 123 
		addi    x3 , x0 , 24 
		addi    x24 , x0 , 198 
		addi    x8 , x0 , 76 
		addi    x26 , x0 , 4 
		blt     x18 , x3 , Less_r 
		bge     x18 , x3 , Bigger_r 
Less_r:
		sub     x9 , x24 , x8 
		and     x13 , x24 , x8 
		slti    x13 , x13 , 169 
		srl     x13 , x13 , x26 
		addi    x14 , x0 , 11 
		bne     x13 , x14 , Fail 
Bigger_r:
		or      x9 , x24 , x8 
		xor     x13 , x24 , x8 
		sltiu   x13 , x13 , 89 
		sra     x13 , x13 , x26 
		addi    x14 , x0 , 21 
		bne     x13 , x14 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 

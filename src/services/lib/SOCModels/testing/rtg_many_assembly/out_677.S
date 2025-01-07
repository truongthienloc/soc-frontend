.text

#The program checks the ALU instruction in R_type

Main:
		addi    x25 , x0 , 146 
		addi    x26 , x0 , 47 
		addi    x13 , x0 , 14 
		addi    x7 , x0 , 199 
		addi    x20 , x0 , 0 
		blt     x25 , x26 , Less_r 
		bge     x25 , x26 , Bigger_r 
Less_r:
		sub     x8 , x13 , x7 
		and     x27 , x13 , x7 
		slti    x27 , x27 , 195 
		srl     x27 , x27 , x20 
		addi    x3 , x0 , -179 
		bne     x27 , x3 , Fail 
Bigger_r:
		or      x8 , x13 , x7 
		xor     x27 , x13 , x7 
		sltiu   x27 , x27 , 34 
		sra     x27 , x27 , x20 
		addi    x3 , x0 , 408 
		bne     x27 , x3 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 

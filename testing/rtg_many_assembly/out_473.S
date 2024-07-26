.text

#The program checks the ALU instruction in R_type

Main:
		addi    x27 , x0 , 51 
		addi    x5 , x0 , -48 
		addi    x18 , x0 , 125 
		addi    x20 , x0 , 70 
		addi    x9 , x0 , 0 
		blt     x27 , x5 , Less_r 
		bge     x27 , x5 , Bigger_r 
Less_r:
		sub     x15 , x18 , x20 
		and     x25 , x18 , x20 
		slti    x25 , x25 , 150 
		srl     x25 , x25 , x9 
		addi    x19 , x0 , 123 
		bne     x25 , x19 , Fail 
Bigger_r:
		or      x15 , x18 , x20 
		xor     x25 , x18 , x20 
		sltiu   x25 , x25 , 45 
		sra     x25 , x25 , x9 
		addi    x19 , x0 , 186 
		bne     x25 , x19 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 

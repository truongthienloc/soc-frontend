.text

#The program checks the ALU instruction in I_type

Main:
		addi    x25 , x0 , 192 
		addi    x29 , x0 , 191 
		sltu    x20 , x25 , x29 
		bltu    x25 , x29 , Less_i 
		bgeu    x25 , x29 , Bigger_i 
Less_i:
		ori     x1 , x25 , 57 
		sub     x4 , x29 , x25 
		srai    x4 , x4 , 1 
		and     x4 , x4 , x0 
		addi    x7 , x0 , 0 
		beq     x4 , x7 , Pass 
Bigger_i:
		ori     x1 , x25 , 100 
		sub     x4 , x29 , x25 
		srai    x4 , x4 , 3 
		and     x4 , x4 , x0 
		addi    x7 , x0 , 0 
		beq     x4 , x7 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 

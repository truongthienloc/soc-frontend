.text

#The program checks the ALU instruction in I_type

Main:
		addi    x20 , x0 , 31 
		addi    x8 , x0 , 30 
		sltu    x11 , x20 , x8 
		bltu    x20 , x8 , Less_i 
		bgeu    x20 , x8 , Bigger_i 
Less_i:
		ori     x27 , x20 , 17 
		sub     x25 , x8 , x20 
		srai    x25 , x25 , 3 
		and     x25 , x25 , x0 
		addi    x5 , x0 , 0 
		beq     x25 , x5 , Pass 
Bigger_i:
		ori     x27 , x20 , 28 
		sub     x25 , x8 , x20 
		srai    x25 , x25 , 1 
		and     x25 , x25 , x0 
		addi    x5 , x0 , 0 
		beq     x25 , x5 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 

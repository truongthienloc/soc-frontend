.text

#The program checks the ALU instruction in I_type

Main:
		addi    x28 , x0 , -2048 
		addi    x19 , x0 , 30 
		sltu    x11 , x28 , x19 
		bltu    x28 , x19 , Less_i 
		bgeu    x28 , x19 , Bigger_i 
Less_i:
		ori     x8 , x28 , 39 
		sub     x25 , x19 , x28 
		srai    x25 , x25 , 1 
		and     x25 , x25 , x0 
		addi    x24 , x0 , 0 
		beq     x25 , x24 , Pass 
Bigger_i:
		ori     x8 , x28 , 32 
		sub     x25 , x19 , x28 
		srai    x25 , x25 , 3 
		and     x25 , x25 , x0 
		addi    x24 , x0 , 0 
		beq     x25 , x24 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 

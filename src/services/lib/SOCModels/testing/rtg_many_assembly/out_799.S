.text

#The program finds the value of fibonacci 

Fibo:
		addi    x2 , x0 , 12 
		addi    x8 , x0 , 1 
		addi    x11 , x0 , 1 
		addi    x29 , x0 , 3 
		beq     x2 , x0 , Result0 
		beq     x2 , x11 , Result1 
Loop: 
		blt     x2 , x29 , Result 
		add     x10 , x8 , x11 
		addi    x8 , x11 , 0 
		addi    x11 , x10 , 0 
		addi    x29 , x29 , 1 
		jal     x0 , Loop 
Result0:
		addi    x10 , x0 , 0 
		addi    x30 , x0 , 0 
		bne     x10 , x30 , Fail 
Result1:
		addi    x10 , x0 , 1 
		addi    x23 , x0 , 1 
		bne     x10 , x23 , Fail 
Result:
		addi    x6 , x0 , 144 
		bne     x10 , x6 , Result1 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
